{{- range (partial "jr/resume.html" .).contact }}
- {{ .label }}: [{{ .value }}]({{ .url }})
{{- end -}}
