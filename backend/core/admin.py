from django.contrib import admin
from .models import ExchangeRate

@admin.register(ExchangeRate)
class ExchangeRateAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'rate', 'updated_at')
    
    def has_add_permission(self, request):
        # Only allow 1 instance
        if ExchangeRate.objects.exists():
            return False
        return True

    def has_delete_permission(self, request, obj=None):
        return False
