
from django.urls import path,include
from .views import RoomView,CreateRommView,GetdataRoom,JoinRoom,UserInRoom, RoomViews,UpdateRoom, GetdataRoombyid
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'room', RoomViews, 'room')

# Urls for the backend

urlpatterns = [

    path('', RoomView.as_view()),
    path('create-room', CreateRommView.as_view()),
    path('get-room', GetdataRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('in-room', UserInRoom.as_view()),
    path('update', UpdateRoom.as_view()),
    path('', include(router.urls)),
    path('get-room-id', GetdataRoombyid.as_view()),




]
