from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'parent', 'image']

class ProductSerializer(serializers.ModelSerializer):
    price_cup = serializers.ReadOnlyField() 
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'product_type', 
            'price_usd', 'price_cup', 
            'image', 'stock',
            'is_active', 'is_featured',
            'category', 'category_name',
            # Fashion
            'size', 'brand', 'condition', 
            # Craft
            'material', 'origin',
            # Meta
            'created_at'
        ]
