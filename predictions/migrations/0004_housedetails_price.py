# Generated by Django 4.0.4 on 2022-08-10 09:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('predictions', '0003_housedetails_sold'),
    ]

    operations = [
        migrations.AddField(
            model_name='housedetails',
            name='price',
            field=models.CharField(default='15000', max_length=200),
            preserve_default=False,
        ),
    ]