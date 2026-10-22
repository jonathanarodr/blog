{{- /* Markdown version: the images, one per paragraph, then the caption. */ -}}
{{- range findRE `!\[[^\]]*\]\([^)]*\)` .Inner }}
{{ . }}
{{ end }}
{{- with .Get "caption" }}
*{{ . }}*
{{- end -}}
