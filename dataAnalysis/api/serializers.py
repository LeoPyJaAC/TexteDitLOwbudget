from rest_framework import serializers
from .models import Room


# Room serial, to communicate with react

class RoomSeerial(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'guest_can_edit', 'guest_can_upload_files_amount', 'dateCreation', 'textediton')


# Room creation serializer
class RoomMakrserial(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_edit', 'guest_can_upload_files_amount')


class updateRoom(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])

    class Meta:
        model = Room
        fields = ('textediton','code')
