from django.contrib import admin
from .models import Category, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'product_type', 'price_usd', 'get_price_cup', 'stock', 'is_active')
    list_filter = ('product_type', 'category', 'is_active', 'is_featured')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('General', {
            'fields': ('name', 'slug', 'description', 'product_type', 'category', 'image', 'is_active', 'is_featured')
        }),
        ('Pricing', {
            'fields': ('price_usd', 'cost_usd', 'stock')
        }),
        ('Fashion Details', {
            'fields': ('size', 'brand', 'condition'),
            'description': "Fill only if Product Type is Fashion",
        }),
        ('Craft Details', {
            'fields': ('material', 'origin'),
            'description': "Fill only if Product Type is Craft",
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )

    def get_price_cup(self, obj):
        return f"{obj.price_cup} CUP"
    get_price_cup.short_description = "Price (CUP)"
