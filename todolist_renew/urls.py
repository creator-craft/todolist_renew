from django.urls import path
from django.views.generic import TemplateView

from . import api

urlpatterns = [
    path("api/todos", api.todolist),
    path("api/todos/<int:todo_id>", api.todo),

    path('', TemplateView.as_view(template_name='index.html')),
    path('stats', TemplateView.as_view(template_name='index.html')),
]
