from django.db import models
import random
import string

# Generate a random code with ascii uppercase characters
def generate_code():
    lenght = 16
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=lenght))
        if Room.objects.filter(code=code).count() == 0:
            break
    return code


# Model for room
class Room(models.Model):
    code = models.CharField(max_length = 8, default = generate_code, unique = True)
    host = models.CharField(max_length=12, unique= True)
    guest_can_edit = models.BooleanField(null=False, default=False)
    guest_can_upload_files_amount= models.IntegerField(null=False, default=2)
    dateCreation = models.DateTimeField(auto_now_add=True)
    textediton = models.TextField(blank=True)


