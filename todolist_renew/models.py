from django.db import models


class TodoList(models.Model):
    id: int
    title = models.CharField(max_length=200, null=False)
    created_at = models.DateTimeField("date published", auto_now=True)
    completed = models.BooleanField(default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "created_at": self.created_at,
            "completed": self.completed,
        }
