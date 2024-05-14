# Generated by Django 5.0.4 on 2024-05-12 13:27

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("credit", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Payment",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("amount", models.DecimalField(decimal_places=2, max_digits=10)),
                ("deadline", models.DateField(null=True)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("pending", "Pending"),
                            ("missed", "Missed"),
                            ("paid", "Paid"),
                            ("paid_late", "Paid late"),
                        ],
                        default="pending",
                        max_length=30,
                    ),
                ),
                ("credit", models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to="credit.credit")),
            ],
            options={
                "ordering": ("-id",),
                "abstract": False,
            },
        ),
    ]
