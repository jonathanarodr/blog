{{- /* Markdown version: a blockquote. */ -}}
{{- range split (trim .Inner "\n") "\n" }}
> {{ . }}
{{- end -}}
