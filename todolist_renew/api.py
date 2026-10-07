from django.http import HttpRequest, JsonResponse
from pydantic import BaseModel, ValidationError
from rest_framework.decorators import api_view

from .models import TodoList


class TodoInputData(BaseModel):
    title: str | None = None
    completed: bool | None = None


@api_view(["GET", "POST"])
def todolist(req: HttpRequest):
    if req.method == "GET":
        return JsonResponse(list(TodoList.objects.values()), safe=False)

    try:  # POST
        data = TodoInputData.model_validate_json(req.body)
        if not data.title or not data.title.strip():
            return JsonResponse({"error": "Invalid title"}, status=400)
        TodoList.objects.create(title=data.title)
        return JsonResponse({}, status=201)
    except ValidationError:
        return JsonResponse({"error": "Invalid body"}, status=400)


@api_view(["GET", "PATCH", "DELETE"])
def todo(req: HttpRequest, todo_id: int):
    try:
        todo = TodoList.objects.get(id=todo_id)
    except TodoList.DoesNotExist:
        return JsonResponse({"error": "Not found"}, status=404)

    if req.method == "GET":
        return JsonResponse(todo.to_dict())

    if req.method == "PATCH":
        try:
            data = TodoInputData.model_validate_json(req.body)
        except ValidationError:
            return JsonResponse({"error": "Invalid body"}, status=400)

        if data.title and data.title.strip():
            todo.title = data.title
        if data.completed is not None:
            todo.completed = data.completed
        todo.save()

    if req.method == "DELETE":
        todo.delete()

    return JsonResponse({}, status=204)
