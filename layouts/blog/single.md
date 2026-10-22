{{- partial "jr/markdown-front-matter.md" . }}
# {{ .Title }}
{{- with .Description }}

> {{ . }}
{{- end }}

{{ .Date | time.Format ":date_long" }} · {{ T "readingTime" .ReadingTime }}

{{ partial "jr/markdown-body.md" . }}
