{{- range (partial "jr/resume.html" .).languages }}
- {{ .name }}: {{ .level }}
{{- end -}}
