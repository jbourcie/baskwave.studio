#!/usr/bin/env python3
"""Vérifications statiques simples, sans dépendance Python externe."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import re

ROOT = Path(__file__).resolve().parents[1]
REQUIRED = ['index.html', 'zigspire.html', 'support.html', 'privacy.html', 'legal.html', '404.html', '.nojekyll', 'app-ads.txt']

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.paths = []
        self.title = False
        self.description = False
        self.lang = False
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='html' and a.get('lang')=='fr': self.lang = True
        if tag=='title': self.title=True
        if tag=='meta' and a.get('name')=='description': self.description=True
        for key in ('href','src'):
            if key in a and a[key] and not a[key].startswith(('#','mailto:','tel:','data:','javascript:')):
                parts=urlsplit(a[key])
                if not parts.scheme and not parts.netloc and parts.path:
                    self.paths.append(unquote(parts.path))

issues=[]
for name in REQUIRED:
    if not (ROOT/name).exists(): issues.append(f'Manquant : {name}')
for page in ROOT.glob('*.html'):
    checker=Links()
    checker.feed(page.read_text(encoding='utf8'))
    if not (checker.title and checker.description and checker.lang):
        issues.append(f'Métadonnées absentes : {page.name}')
    for rel in checker.paths:
        absolute=(page.parent/rel).resolve()
        if not absolute.is_relative_to(ROOT) or not absolute.is_file():
            issues.append(f'Lien cassé : {page.name} -> {rel}')
    for rel in ('./privacy.html','./support.html'):
        if rel not in checker.paths:
            issues.append(f'Lien global absent : {page.name} -> {rel}')
raw=(ROOT/'app-ads.txt').read_text(encoding='utf8')
if any(re.match(r'^google\.com,\s*pub-', l) for l in raw.splitlines()):
    print('AVERTISSEMENT : entrée AdMob active détectée, vérifier l’ID éditeur !')
if issues:
    print('ÉCHEC :\n'+'\n'.join(issues))
    raise SystemExit(1)
print('OK — pages HTML, méta-données, liens et ressources vérifiés.')