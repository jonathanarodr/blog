{{- /* Page content as Markdown: shortcodes rendered with their .md templates,
  site-relative links made absolute and the few raw HTML bits simplified. Context: page. */ -}}
{{- $body := .RenderShortcodes }}
{{- $body = replace $body "<!--more-->" "" }}
{{- $body = replaceRE `<p class="name-role">(.*?)</p>` "*$1*" $body }}
{{- $body = replace $body "](/" (printf "](%s" site.BaseURL) }}
{{- /* Bundle-relative paths (images/foto.jpg) become the file's URL; translations share one published copy */}}
{{- $page := . }}
{{- range $m := findRESubmatch `\]\(([^/#\s:)][^\s:)]*)[\s)]` $body }}
  {{- with $page.Resources.Get (index $m 1) }}{{ $body = replace $body (printf "](%s" (index $m 1)) (printf "](%s" .Permalink) }}{{ end }}
{{- end }}
{{- $body = replaceRE `\n{3,}` "\n\n" $body }}
{{- trim $body "\n" }}
