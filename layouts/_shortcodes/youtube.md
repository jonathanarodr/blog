{{- /* Markdown version: a link to the video, with the caption when there is one. */ -}}
{{- $id := .Get "id" | default (.Get 0) -}}
[▶ {{ .Get "caption" | default (.Get "title") | default "YouTube" }}](https://www.youtube.com/watch?v={{ $id }})
