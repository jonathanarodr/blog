{{- /* Page content as Markdown: shortcodes rendered with their .md templates,
  site-relative links made absolute and the few raw HTML bits simplified. Context: page. */ -}}
{{- $body := .RenderShortcodes }}
{{- $body = replace $body "<!--more-->" "" }}
{{- $body = replaceRE `<p class="name-role">(.*?)</p>` "*$1*" $body }}
{{- $body = replace $body "](/" (printf "](%s" site.BaseURL) }}
{{- $body = replaceRE `\n{3,}` "\n\n" $body }}
{{- trim $body "\n" }}
