import { defineMermaidSetup } from '@slidev/types'

/* Mermaid in ink on paper: white nodes, ink strokes, sans
   labels. No red: red belongs to the knot and the marker. */
export default defineMermaidSetup(() => ({
  theme: 'base',
  themeVariables: {
    fontFamily: '"Schibsted Grotesk", ui-sans-serif, system-ui, sans-serif',
    fontSize: '22px',
    background: '#F7F5F0',
    primaryColor: '#FFFFFF',
    primaryTextColor: '#1C2233',
    primaryBorderColor: '#1C2233',
    secondaryColor: '#EDEAE3',
    tertiaryColor: '#F7F5F0',
    lineColor: '#1C2233',
    textColor: '#1C2233',
    edgeLabelBackground: '#F7F5F0',
    clusterBkg: '#EDEAE3',
    clusterBorder: '#DEDCD5',
  },
}))
