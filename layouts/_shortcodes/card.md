{{- $link := .Get "link" }}
- [{{ .Get "title" }}]({{ cond (strings.HasPrefix $link "http") $link ($link | absLangURL) }}){{ with .Get "subtitle" }} — {{ . }}{{ end }}
