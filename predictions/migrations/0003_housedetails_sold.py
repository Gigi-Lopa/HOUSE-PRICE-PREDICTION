# Generated by Django 4.0.4 on 2022-08-09 19:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('predictions', '0002_housedetails'),
    ]

    operations = [
        migrations.AddField(
            model_name='housedetails',
            name='sold',
            field=models.CharField(default='No', max_length=500),
        ),
    ]