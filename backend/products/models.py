from django.db import models
from core.models import ExchangeRate

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='children', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='categories/', null=True, blank=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        full_path = [self.name]
        k = self.parent
        while k is not None:
            full_path.append(k.name)
            k = k.parent
        return ' -> '.join(full_path[::-1])

class Product(models.Model):
    TYPE_CHOICES = (
        ('FASHION', 'Fashion (Second Hand)'),
        ('CRAFT', 'Craft (Locally Made)'),
    )
    
    CONDITION_CHOICES = (
        ('NEW_TAG', 'New with Tags'),
        ('LIKE_NEW', 'Like New'),
        ('GOOD', 'Good Condition'),
        ('FAIR', 'Fair Condition'),
    )

    # Core Fields
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    product_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='FASHION')
    category = models.ForeignKey(Category, related_name='products', on_delete=models.SET_NULL, null=True)
    
    # Financials (Base is USD)
    price_usd = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Public Price (USD)")
    cost_usd = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Internal Cost (USD)", help_text="Visible only to Admins")
    
    stock = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    
    # Media
    image = models.ImageField(upload_to='products/', verbose_name="Main Image")
    
    # Fashion Specific Attributes
    size = models.CharField(max_length=50, blank=True, null=True, verbose_name="Size (Fashion)")
    brand = models.CharField(max_length=100, blank=True, null=True, verbose_name="Brand (Fashion)")
    condition = models.CharField(max_length=20, choices=CONDITION_CHOICES, blank=True, null=True, verbose_name="Condition (Fashion)")
    
    # Craft Specific Attributes
    material = models.CharField(max_length=200, blank=True, null=True, verbose_name="Materials (Craft)")
    origin = models.CharField(max_length=200, blank=True, null=True, verbose_name="Origin (e.g. San Francisco de Paula)")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    @property
    def price_cup(self):
        """Calculates CUP price based on current Exchange Rate."""
        try:
            rate = ExchangeRate.get_rate()
            return round(self.price_usd * rate, 2)
        except Exception:
            return 0.00
