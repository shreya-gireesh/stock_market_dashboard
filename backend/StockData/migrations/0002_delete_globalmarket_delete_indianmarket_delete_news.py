# Generated by Django 5.0.7 on 2024-07-18 07:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('StockData', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='GlobalMarket',
        ),
        migrations.DeleteModel(
            name='IndianMarket',
        ),
        migrations.DeleteModel(
            name='News',
        ),
    ]
