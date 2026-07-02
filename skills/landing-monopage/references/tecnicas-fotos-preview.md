# Técnicas — Fotos e Preview (Windows/PowerShell)

## 1. Recorte de fotos (System.Drawing)

Eu **não consigo salvar imagens coladas no chat** — o usuário salva no disco (ex.: `Pictures\Camera Roll`) e daí eu copio/recorto para `assets/`.

### Retrato em círculo (foco no rosto)
O círculo usa `object-fit: cover`. Recorte um **quadrado focado no rosto** (nem a foto inteira, que centraliza no torso):
```powershell
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile($origem)
$W=$img.Width; $H=$img.Height
$S = [int]([Math]::Min($W*0.74, $H*0.60))   # lado do quadrado
$x0 = [int](($W - $S)/2)                     # centralizado em x
$y0 = [int]($H * 0.05)                        # começa perto do topo (rosto)
$dst = New-Object System.Drawing.Bitmap $S, $S
$g = [System.Drawing.Graphics]::FromImage($dst)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, (New-Object System.Drawing.Rectangle 0,0,$S,$S), (New-Object System.Drawing.Rectangle $x0,$y0,$S,$S), [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
# salvar JPEG qualidade 90:
$jpg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | ? { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, [long]90)
$dst.Save($destino, $jpg, $ep); $dst.Dispose(); $img.Dispose()
```
- **Ajuste `$y0`/`$x0` e reveja** antes de fechar — recorte errado deixa "rosto flutuante" ou corta a testa.
- **Nunca** use screenshot de flyer/story com UI (texto, coração do Instagram) como retrato. Se só tiver isso, recorte apertado a pessoa; se ficar ruim, peça outra foto ou remova.

### Antes/Depois combinado
Se vier uma foto única lado a lado (antes | depois), **copie direto** para `assets/antes-depois.jpg` e use a `.ba-figure` (imagem estática + selos). Slider de arrastar só vale com **duas fotos alinhadas** (mesmo enquadramento).

## 2. Preview com screenshot (headless Chrome)

Chrome fica em `C:\Program Files\Google\Chrome\Application\chrome.exe`. Use `--user-data-dir` único por run (perfil limpo).

```powershell
& $chrome --headless --disable-gpu --no-sandbox --hide-scrollbars `
  --user-data-dir=$uddUnico --force-prefers-reduced-motion --virtual-time-budget=4500 `
  --window-size=1440,900 --screenshot="$out\hero.png" $urlFileProtocol
```

### Gotchas (todos reais)
- **`--force-prefers-reduced-motion`**: sem isso, seções com `.reveal` saem **em branco** no print (a animação não dispara sem scroll). Com a flag, o CSS de reduced-motion deixa tudo visível.
- **Âncora não rola no headless**: `index.html#servicos` **não** posiciona na seção. Não conte com isso.
- **Página inteira**: `--screenshot` captura só a janela. Para full-page, **não** use janela gigante (o herói `min-height:90vh` vira enorme). Em vez disso, faça uma **cópia** e no `style.css` da cópia adicione:
  `.hero{min-height:auto !important;padding-block:3.5rem !important;} .reveal{opacity:1 !important;transform:none !important;}` e capture alto (ex.: 1100×2600).
- **URL file://** com espaço no caminho: troque `\`→`/` e ` `→`%20`.
- **Abrir no navegador do usuário**: `Start-Process $caminhoIndexHtml`.
- Recorte/zoom de regiões do print: `System.Drawing` com `InterpolationMode=NearestNeighbor`.

## 3. Encoding
Arquivos sempre **UTF-8**. Se editar por PowerShell, `Out-File -Encoding utf8`. Sinal de corrupção: `�` no lugar de acento.
