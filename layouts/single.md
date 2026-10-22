{{- partial "jr/markdown-front-matter.md" . }}
# {{ .Title }}
{{- with .Description }}

{{ . }}
{{- end }}

{{ partial "jr/markdown-body.md" . }}
