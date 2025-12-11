from django.db import models

class ExchangeRate(models.Model):
    """
    Singleton model to store the USD to CUP exchange rate.
    Uses ID=1 for the single active rate.
    """
    currency_from = models.CharField(max_length=3, default='USD', editable=False)
    currency_to = models.CharField(max_length=3, default='CUP', editable=False)
    rate = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        default=300.0, 
        help_text="Current Exchange Rate: 1 USD = X CUP"
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Exchange Rate (USD to CUP)"
        verbose_name_plural = "Exchange Rate"

    def __str__(self):
        return f"1 {self.currency_from} = {self.rate} {self.currency_to}"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass  # Prevent deletion

    @classmethod
    def get_rate(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj.rate
