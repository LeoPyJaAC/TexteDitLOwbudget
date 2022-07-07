from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSeerial, RoomMakrserial, updateRoom
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import viewsets

# Create your views here.
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSeerial


# Join room request
class JoinRoom(APIView):
    lookup_url_kwarg = 'code'

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get(self.lookup_url_kwarg)
        if code != None:
            room_result = Room.objects.filter(code=code)
            if len(room_result) > 0:
                room = room_result[0]
                self.request.session['room_code'] = code
                return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)

            return Response({'Bad Request': 'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Bad Request': 'Invalid post data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)


# Create room
class CreateRommView(APIView):
    serializer_class = RoomMakrserial

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_edit= serializer.data.get('guest_can_edit')

            guest_can_upload_files_amount= serializer.data.get('guest_can_upload_files_amount')
            host=self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_edit = guest_can_edit
                room.guest_can_upload_files_amount = guest_can_upload_files_amount
                room.save(update_fields=['guest_can_edit', 'guest_can_upload_files_amount'])
                self.request.session['room_code'] = room.code
                return Response(RoomSeerial(room).data, status=status.HTTP_200_OK)

            else:
                room = Room(host=host, guest_can_edit=guest_can_edit,
                                guest_can_upload_files_amount=guest_can_upload_files_amount)
                room.save()
                self.request.session['room_code'] = room.code
                return Response(RoomSeerial(room).data, status=status.HTTP_201_CREATED)



        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


# Get Data from room in DB
class GetdataRoom(APIView):
    serializer_class = RoomSeerial
    lookup_url_kwarg= "code"
    def get(self,request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code!=None:
            room = Room.objects.filter(code=code)
            if len(room)> 0:
                data=RoomSeerial(room[0]).data
                data["host"]= self.request.session.session_key== room[0].host
                return Response(data,status=status.HTTP_200_OK)

            return Response({'NOT FOUND': 'Invalid data...'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class GetdataRoombyid(APIView):
    serializer_class = RoomSeerial

    def get(self,request, format=None):

        room = Room.objects.values_list('code')

        return Response(room, status=status.HTTP_200_OK)













class UserInRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        data = {
            'code': self.request.session.get('room_code')
        }
        return JsonResponse(data, status=status.HTTP_200_OK)



class RoomViews(viewsets.ModelViewSet):
    serializer_class = RoomSeerial
    queryset = Room.objects.all()



class UpdateRoom(APIView):
    serializer_class = updateRoom

    def patch(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            textediton = serializer.data.get('textediton')
            code = serializer.data.get('code')

            queryset = Room.objects.filter(code=code)
            if not queryset.exists():
                return Response({'msg': 'Room not found.'}, status=status.HTTP_404_NOT_FOUND)

            room = queryset[0]
            room.textediton=textediton

            room.save(update_fields=['textediton'])
            return Response(RoomSeerial(room).data, status=status.HTTP_200_OK)

        return Response({'Bad Request': "Invalid Data..."}, status=status.HTTP_400_BAD_REQUEST)












