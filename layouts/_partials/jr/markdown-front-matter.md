{{- /* YAML front matter for the Markdown version of a page. Context: page. */ -}}
---
title: {{ .Title | jsonify }}
{{- with .Description }}
description: {{ . | jsonify }}
{{- end }}
{{- if not .Date.IsZero }}
date: {{ .Date.Format "2006-01-02" }}
{{- end }}
{{- with .Params.authors }}
author: {{ delimit (apply . "index" "." "name") ", " | jsonify }}
{{- end }}
{{- with .Params.tags }}
tags: {{ . | jsonify }}
{{- end }}
{{- with .Params.link }}
link: {{ . }}
{{- end }}
lang: {{ site.Language.LanguageCode }}
url: {{ .Permalink }}
---
