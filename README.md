# 🔐 Gerador de Senhas Seguras

Um aplicativo web moderno e seguro para gerar senhas aleatórias com alta entropia, desenvolvido com HTML5, CSS3 e JavaScript vanilla.

![Gerador de Senhas](https://img.shields.io/badge/Projeto-Gerador%20de%20Senhas-8B5CF6)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

## ✨ Características

- **🎨 Interface Moderna**: Design responsivo com gradientes e efeitos glassmorphism
- **🔒 Segurança Máxima**: Utiliza `crypto.getRandomValues()` para geração criptograficamente segura
- **⚡ Performance**: Desenvolvido em JavaScript vanilla (sem dependências externas)
- **📱 Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **♿ Acessível**: Seguindo as diretrizes WCAG para acessibilidade
- **🎯 Personalizável**: Controle total sobre o tipo e tamanho da senha

## 🚀 Funcionalidades

### Geração de Senhas
- Comprimento configurável de 4 a 50 caracteres
- Suporte a letras maiúsculas (A-Z)
- Suporte a letras minúsculas (a-z)
- Inclusão de números (0-9)
- Símbolos especiais (!@#$%^&*()_+-=[]{}|;:,.<>?)

### Interface Intuitiva
- Indicador visual de força da senha em tempo real
- Controle deslizante interativo para o comprimento
- Cópia para área de transferência com um clique
- Feedback visual para todas as ações
- Atalhos de teclado (Ctrl+C para copiar, Ctrl+R para gerar)

### Segurança e Qualidade
- Geração criptograficamente segura usando Web Crypto API
- Algoritmo Fisher-Yates para embaralhamento seguro
- Validação automática para evitar senhas fracas
- Garantia de diversidade de caracteres
- Detecção de padrões repetitivos

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica moderna
- **CSS3**: Estilos avançados com Custom Properties e Grid Layout
- **JavaScript ES6+**: Lógica da aplicação com classes e módulos
- **Web Crypto API**: Geração segura de números aleatórios
- **Clipboard API**: Cópia moderna para área de transferência
- **Google Fonts**: Tipografia Poppins

## 📁 Estrutura do Projeto

```
gerador-senhas/
├── index.html              # Estrutura principal da aplicação
├── src/
│   ├── css/
│   │   ├── reset.css       # Reset e normalização CSS
│   │   └── main.css        # Estilos principais da aplicação
│   └── scripts/
│       └── engine.js       # Lógica principal do gerador
└── README.md               # Documentação do projeto
```

## 🚀 Como Usar

### 1. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/gerador-senhas-seguras.git
cd gerador-senhas-seguras
```

### 2. Execute o Projeto
Como o projeto utiliza apenas tecnologias front-end, você pode:

**Opção 1: Abrir diretamente no navegador**
```bash
# Abra o arquivo index.html em seu navegador
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

**Opção 2: Usar um servidor local**
```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (npx)
npx serve .

# Com PHP
php -S localhost:8000
```

### 3. Acesse a Aplicação
Abra seu navegador e vá para `http://localhost:8000`

## 🎯 Como Funciona

### Configuração da Senha
1. Ajuste o comprimento desejado usando o controle deslizante
2. Selecione os tipos de caracteres que deseja incluir:
   - ☑️ Letras maiúsculas
   - ☑️ Letras minúsculas  
   - ☑️ Números
   - ☑️ Símbolos especiais

### Geração e Uso
1. Clique em "Gerar Nova Senha" ou use `Ctrl+R`
2. A força da senha será indicada automaticamente
3. Copie a senha clicando no ícone de cópia ou use `Ctrl+C`
4. Use sua nova senha segura!

## 🔧 API Principal

### Classe PasswordGenerator

#### Métodos Principais
- `generatePassword()`: Gera uma nova senha com base nas configurações
- `copyPassword()`: Copia a senha atual para a área de transferência
- `calculatePasswordStrength(password)`: Calcula a força da senha (0-100)
- `getStats()`: Retorna estatísticas da senha atual

#### Exemplo de Uso
```javascript
// Acessar o gerador (disponível globalmente)
const stats = passwordGenerator.getStats();
console.log(stats);

// Resultado:
// {
//   currentPasswordLength: 16,
//   currentPasswordStrength: 95,
//   selectedOptions: {
//     uppercase: true,
//     lowercase: true,
//     numbers: true,
//     symbols: true
//   }
// }
```

## 🛡️ Segurança

Este projeto implementa as melhores práticas de segurança para geração de senhas:

- **Entropia Máxima**: Uso da Web Crypto API para aleatoriedade criptográfica
- **Diversidade Garantida**: Algoritmo garante pelo menos um caractere de cada tipo selecionado
- **Embaralhamento Seguro**: Implementação do algoritmo Fisher-Yates
- **Validação Rigorosa**: Detecção automática de padrões fracos
- **Sem Armazenamento**: Senhas não são salvas ou transmitidas

## 🌐 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 60+
- ✅ Firefox 57+
- ✅ Safari 11+
- ✅ Edge 79+

### Funcionalidades com Fallback
- Web Crypto API → Math.random() (menos seguro)
- Clipboard API → document.execCommand() (legado)

## 📱 Responsividade

A aplicação adapta-se automaticamente para diferentes tamanhos de tela:

- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet**: Interface otimizada para touch
- **Mobile**: Layout vertical com controles simplificados

## 🎨 Personalização

### Variáveis CSS Customizáveis
```css
:root {
  --primary-purple: #8B5CF6;
  --dark-purple: #6D28D9;
  --font-family: 'Poppins', sans-serif;
  /* ... outras variáveis */
}
```

### Configurações do Gerador
Modifique as constantes no início da classe `PasswordGenerator`:
```javascript
this.charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};
```

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Diretrizes para Contribuição
- Mantenha o código limpo e bem documentado
- Siga os padrões de codificação existentes
- Teste suas mudanças em diferentes navegadores
- Atualize a documentação quando necessário

## 📋 Roadmap

### Próximas Funcionalidades
- [ ] Modo escuro/claro
- [ ] Histórico de senhas geradas (opcional)
- [ ] Exportação de senhas em diferentes formatos
- [ ] Integração com gerenciadores de senha
- [ ] Versão PWA (Progressive Web App)
- [ ] API para integração com outras aplicações

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**DevAlex-full**
- GitHub: [@DevAlex-full](https://github.com/DevAlex-full)

## 🙏 Agradecimentos

- Inspirado nas melhores práticas de segurança da OWASP
- Design baseado em tendências modernas de UI/UX
- Comunidade open source por ferramentas e recursos

---

<div align="center">

**⭐ Se este projeto foi útil para você, considere dar uma estrela!**

Feito com 💜 e ☕ por DevAlex-full

</div>
