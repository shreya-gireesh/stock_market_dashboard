from rest_framework import serializers
from .models import GlobalMarket, IndianMarket, News

class GlobalMarketSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalMarket
        fields = '__all__'

class IndianMarketSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndianMarket
        fields = '__all__'

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'
