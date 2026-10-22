{{- /* Markdown version of the résumé timeline. Context: list of résumé items (see timeline.html). */ -}}
{{- range . }}
  {{- $item := . }}
  {{- range .roles }}

### {{ .title }} — {{ with $item.url }}[{{ $item.company }}]({{ . }}){{ else }}{{ $item.company }}{{ end }}

{{ partial "jr/month.html" .start }} – {{ partial "jr/month.html" .end }}
{{- with .summary }}

{{ . }}
{{- end }}
{{- with .highlights }}
{{ range . }}
- {{ . }}
{{- end }}
{{- end }}
{{- with .skills }}

Skills: {{ delimit . ", " }}
{{- end }}
  {{- end }}
{{- end }}
