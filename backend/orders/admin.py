from django.contrib import admin
from django.db.models import Sum
from django.template.response import TemplateResponse
from .models import Order, OrderItem, SalesStat

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    raw_id_fields = ['product']
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'status', 'total_usd', 'total_cup', 'exchange_rate_snapshot', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('user__username', 'id')
    inlines = [OrderItemInline]
    readonly_fields = ('created_at', 'updated_at')

@admin.register(SalesStat)
class SalesStatAdmin(admin.ModelAdmin):
    """
    Custom view for Sales Stats (Dashboard).
    Overrides the changelist to show charts.
    """
    def has_add_permission(self, request):
        return False
    
    def has_delete_permission(self, request, obj=None):
        return False
    
    def has_change_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        # Calculation Logic
        stats = Order.objects.filter(status__in=['CONFIRMED', 'SHIPPED', 'COMPLETED']).aggregate(
            usd=Sum('total_usd'),
            cup=Sum('total_cup')
        )
        
        context = {
            'title': "Sales Dashboard",
            'revenue_usd': stats['usd'] or 0,
            'revenue_cup': stats['cup'] or 0,
            'pending_count': Order.objects.filter(status='PENDING').count(),
            'completed_count': Order.objects.filter(status__in=['SHIPPED', 'COMPLETED']).count(),
        }
        context.update(extra_context or {})
        
        return TemplateResponse(request, "admin/sales_dashboard.html", context)
