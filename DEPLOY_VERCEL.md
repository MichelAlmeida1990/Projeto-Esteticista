# 🚀 Deploy na Vercel - Guia Completo

Este projeto está configurado para deploy na Vercel de duas formas: **com servidor Express** ou **versão estática pura**.

## 📋 Opções de Deploy

### Opção 1: Deploy com Servidor Express (Recomendado)
- Usa `vercel.json` (configuração atual)
- Mantém funcionalidades do servidor
- API routes funcionais
- Health check disponível

### Opção 2: Deploy Estático Puro
- Usa `vercel-static.json`
- Apenas arquivos estáticos + API routes
- Mais rápido e econômico
- Ideal para sites simples

## 🛠️ Como Fazer Deploy

### Método 1: Via Interface da Vercel (Mais Fácil)

1. **Acesse [vercel.com](https://vercel.com)**
2. **Faça login** com GitHub
3. **Clique em "New Project"**
4. **Importe o repositório:** `MichelAlmeida1990/Projeto-Esteticista`
5. **Configure o projeto:**
   - Framework Preset: `Other`
   - Build Command: `npm run vercel-build`
   - Output Directory: `./` (raiz)
6. **Clique em "Deploy"**

### Método 2: Via CLI da Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy do projeto
vercel

# Deploy para produção
vercel --prod
```

## ⚙️ Configurações Específicas

### Para Deploy com Express:
```bash
# Renomear arquivo de configuração
mv vercel.json vercel-config.json
cp vercel-config.json vercel.json
```

### Para Deploy Estático:
```bash
# Renomear arquivo de configuração
mv vercel-static.json vercel.json
```

## 📊 Funcionalidades Disponíveis

### ✅ Funcionam em Ambas as Versões:
- Site principal (`/`)
- Página offline (`/offline`)
- Sistema de agendamento WhatsApp
- Validação de formulários
- Design responsivo
- Performance otimizada

### ✅ Apenas na Versão Express:
- Health check (`/health`)
- API de contato completa (`/api/contact`)
- Logs detalhados
- Middleware de segurança

### ✅ Apenas na Versão Estática:
- API routes básicas (`/api/health`, `/api/contact`)
- Deploy mais rápido
- Menor uso de recursos
- Cache otimizado

## 🔧 Variáveis de Ambiente

A Vercel configurará automaticamente:
- `NODE_ENV=production`
- `VERCEL_URL` (URL do projeto)
- `VERCEL_REGION` (região do deploy)

## 📱 Domínio Personalizado

1. **Na dashboard da Vercel:**
   - Vá em Settings → Domains
   - Adicione seu domínio
   - Configure DNS conforme instruções

2. **DNS Configuração:**
   ```
   Type: CNAME
   Name: www (ou @)
   Value: cname.vercel-dns.com
   ```

## 🚀 Vantagens da Vercel

### ✅ Performance:
- CDN global automático
- Edge functions
- Cache inteligente
- Otimização automática

### ✅ Desenvolvedor:
- Deploy automático via Git
- Preview deployments
- Rollback fácil
- Analytics integrado

### ✅ Custo:
- Plano gratuito generoso
- Sem custos ocultos
- Escalabilidade automática

## 📈 Monitoramento

### Analytics da Vercel:
- Page views
- Performance metrics
- Core Web Vitals
- Geographic data

### Logs:
```bash
# Ver logs em tempo real
vercel logs

# Logs específicos
vercel logs --follow
```

## 🔄 Atualizações Automáticas

Toda vez que você fizer push para o GitHub:
1. **Vercel detecta mudanças**
2. **Inicia build automático**
3. **Deploy para preview**
4. **Deploy para produção** (se branch main)

## 🆚 Vercel vs Railway

| Recurso | Vercel | Railway |
|---------|--------|---------|
| Deploy | Automático | Automático |
| Performance | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Facilidade | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Custo | Gratuito | Gratuito |
| Domínio | Incluído | Incluído |
| SSL | Automático | Automático |

## 🎯 Recomendação

**Use a Vercel!** É mais rápida, tem melhor performance e é mais fácil de configurar para este tipo de projeto.

### Comandos Rápidos:
```bash
# Deploy na Vercel
vercel

# Deploy com configuração estática
mv vercel-static.json vercel.json && vercel

# Voltar para configuração Express
mv vercel.json vercel-static.json && mv vercel-config.json vercel.json
```
