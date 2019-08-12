from django.db import models

# Below is the model for a video. Every video object will have these traits.

#maybe make the parameter limits more forgiving?

class Video(models.Model):
    vid_id = models.CharField(max_length=11)
    title = models.TextField()
