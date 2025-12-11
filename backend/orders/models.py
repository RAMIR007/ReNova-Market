from django.db import models
from django.conf import settings
from products.models import Product

class Order(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'Pending Payment'),
        ('CONFIRMED', 'Confirmed/Paid'),
        ('SHIPPED', 'Shipped'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled'),
    )
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='orders', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    
    # Financial snapshot
    total_usd = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total_cup = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    exchange_rate_snapshot = models.DecimalField(max_digits=10, decimal_places=2, help_text="Rate at time of purchase")
    
    # Shipping info (simplified)
    shipping_address = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order #{self.id} - {self.user.username} ({self.status})"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='order_items', on_delete=models.SET_NULL, null=True)
    
    quantity = models.PositiveIntegerField(default=1)
    price_usd_snapshot = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f"{self.quantity} x {self.product.name} (Order #{self.order.id})"

    @property
    def total_usd(self):
        return self.quantity * self.price_usd_snapshot

class SalesStat(Order):
    class Meta:
        proxy = True
        verbose_name = "Sales Dashboard"
        verbose_name_plural = "Sales Dashboard"
