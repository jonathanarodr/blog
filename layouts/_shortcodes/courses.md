{{- range (partial "jr/resume.html" .).courses }}
- {{ .name }}{{ with .issuer }} — {{ . }}{{ end }} ({{ partial "jr/month.html" .date }})
{{- end -}}
