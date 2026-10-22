**{{ .Get 0 | default (.Get "title") | default "Detalhes" }}**

{{ trim .Inner "\n" }}
