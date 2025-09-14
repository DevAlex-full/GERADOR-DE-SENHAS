// ENGINE.JS - Lógica do Gerador de Senhas Seguras

class PasswordGenerator {
    constructor() {
        // Conjuntos de caracteres
        this.charSets = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        };
        
        // Elementos DOM
        this.elements = {
            passwordOutput: document.getElementById('passwordOutput'),
            copyButton: document.getElementById('copyButton'),
            generateButton: document.getElementById('generateButton'),
            passwordLength: document.getElementById('passwordLength'),
            lengthValue: document.getElementById('lengthValue'),
            includeUppercase: document.getElementById('includeUppercase'),
            includeLowercase: document.getElementById('includeLowercase'),
            includeNumbers: document.getElementById('includeNumbers'),
            includeSymbols: document.getElementById('includeSymbols'),
            strengthFill: document.getElementById('strengthFill'),
            strengthText: document.getElementById('strengthText'),
            strengthIndicator: document.querySelector('.strength-indicator')
        };
        
        // Estado da aplicação
        this.state = {
            currentPassword: '',
            isGenerating: false,
            copyTimeout: null
        };
        
        // Inicializar aplicação
        this.init();
    }

    /**
     * Inicializa a aplicação
     */
    init() {
        this.bindEvents();
        this.updateLengthDisplay();
        this.generatePassword();
        this.addFadeInAnimation();
    }

    /**
     * Vincula eventos aos elementos
     */
    bindEvents() {
        // Evento de gerar senha
        this.elements.generateButton.addEventListener('click', () => {
            this.generatePassword();
        });

        // Evento de copiar senha
        this.elements.copyButton.addEventListener('click', () => {
            this.copyPassword();
        });

        // Evento de mudança no comprimento
        this.elements.passwordLength.addEventListener('input', (e) => {
            this.updateLengthDisplay();
            this.generatePassword();
        });

        // Eventos de mudança nas opções
        const checkboxes = [
            this.elements.includeUppercase,
            this.elements.includeLowercase,
            this.elements.includeNumbers,
            this.elements.includeSymbols
        ];

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.validateOptions();
                this.generatePassword();
            });
        });

        // Atalhos de teclado
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key.toLowerCase()) {
                    case 'c':
                        if (this.state.currentPassword) {
                            e.preventDefault();
                            this.copyPassword();
                        }
                        break;
                    case 'r':
                        e.preventDefault();
                        this.generatePassword();
                        break;
                }
            }
            
            // Gerar nova senha com Enter ou Espaço
            if (e.target === this.elements.generateButton) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.generatePassword();
                }
            }
        });

        // Evento para mostrar senha ao clicar no campo
        this.elements.passwordOutput.addEventListener('click', () => {
            if (this.state.currentPassword) {
                this.elements.passwordOutput.select();
            }
        });
    }

    /**
     * Atualiza a exibição do comprimento da senha
     */
    updateLengthDisplay() {
        const length = this.elements.passwordLength.value;
        this.elements.lengthValue.textContent = length;
        
        // Atualizar cor do slider baseado no valor
        const percentage = ((length - 4) / (50 - 4)) * 100;
        this.elements.passwordLength.style.background = `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${percentage}%, #2D2D42 ${percentage}%, #2D2D42 100%)`;
    }

    /**
     * Valida as opções selecionadas
     */
    validateOptions() {
        const checkboxes = [
            this.elements.includeUppercase,
            this.elements.includeLowercase,
            this.elements.includeNumbers,
            this.elements.includeSymbols
        ];

        const checkedCount = checkboxes.filter(cb => cb.checked).length;

        // Garantir que pelo menos uma opção está selecionada
        if (checkedCount === 0) {
            this.elements.includeLowercase.checked = true;
            this.showNotification('Pelo menos um tipo de caractere deve ser selecionado!', 'warning');
        }

        return checkedCount > 0;
    }

    /**
     * Gera uma nova senha
     */
    generatePassword() {
        if (this.state.isGenerating) return;
        
        this.state.isGenerating = true;
        this.elements.generateButton.disabled = true;
        this.elements.generateButton.classList.add('pulse');

        // Simular processamento (feedback visual)
        setTimeout(() => {
            try {
                if (!this.validateOptions()) {
                    return;
                }

                const length = parseInt(this.elements.passwordLength.value);
                let charset = '';
                let guaranteedChars = [];

                // Construir conjunto de caracteres e garantir diversidade
                if (this.elements.includeUppercase.checked) {
                    charset += this.charSets.uppercase;
                    guaranteedChars.push(this.getRandomChar(this.charSets.uppercase));
                }

                if (this.elements.includeLowercase.checked) {
                    charset += this.charSets.lowercase;
                    guaranteedChars.push(this.getRandomChar(this.charSets.lowercase));
                }

                if (this.elements.includeNumbers.checked) {
                    charset += this.charSets.numbers;
                    guaranteedChars.push(this.getRandomChar(this.charSets.numbers));
                }

                if (this.elements.includeSymbols.checked) {
                    charset += this.charSets.symbols;
                    guaranteedChars.push(this.getRandomChar(this.charSets.symbols));
                }

                if (charset === '') {
                    throw new Error('Nenhum conjunto de caracteres selecionado');
                }

                // Gerar senha
                let password = '';
                
                // Adicionar caracteres garantidos
                for (let char of guaranteedChars) {
                    password += char;
                }

                // Preencher o restante aleatoriamente
                for (let i = guaranteedChars.length; i < length; i++) {
                    password += this.getRandomChar(charset);
                }

                // Embaralhar a senha para evitar padrões previsíveis
                password = this.shuffleString(password);

                // Atualizar estado e interface
                this.state.currentPassword = password;
                this.displayPassword(password);
                this.updateStrengthIndicator(password);
                
                // Feedback de sucesso
                this.showNotification('Nova senha gerada com sucesso!', 'success');

            } catch (error) {
                console.error('Erro ao gerar senha:', error);
                this.showNotification('Erro ao gerar senha. Tente novamente.', 'error');
            } finally {
                // Restaurar estado do botão
                this.state.isGenerating = false;
                this.elements.generateButton.disabled = false;
                this.elements.generateButton.classList.remove('pulse');
            }
        }, 150);
    }

    /**
     * Obtém um caractere aleatório criptograficamente seguro
     */
    getRandomChar(charset) {
        if (window.crypto && window.crypto.getRandomValues) {
            const array = new Uint32Array(1);
            window.crypto.getRandomValues(array);
            return charset[array[0] % charset.length];
        } else {
            // Fallback para Math.random se crypto não estiver disponível
            return charset[Math.floor(Math.random() * charset.length)];
        }
    }

    /**
     * Embaralha uma string de forma segura
     */
    shuffleString(str) {
        const arr = str.split('');
        
        // Fisher-Yates shuffle algorithm
        for (let i = arr.length - 1; i > 0; i--) {
            let j;
            if (window.crypto && window.crypto.getRandomValues) {
                const array = new Uint32Array(1);
                window.crypto.getRandomValues(array);
                j = array[0] % (i + 1);
            } else {
                j = Math.floor(Math.random() * (i + 1));
            }
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        
        return arr.join('');
    }

    /**
     * Exibe a senha gerada
     */
    displayPassword(password) {
        this.elements.passwordOutput.value = password;
        this.elements.passwordOutput.classList.add('fade-in');
        
        // Remover classe de animação após completar
        setTimeout(() => {
            this.elements.passwordOutput.classList.remove('fade-in');
        }, 300);
    }

    /**
     * Copia a senha para a área de transferência
     */
    async copyPassword() {
        if (!this.state.currentPassword) {
            this.showNotification('Nenhuma senha para copiar!', 'warning');
            return;
        }

        try {
            // Tentar usar a API moderna de clipboard
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(this.state.currentPassword);
            } else {
                // Fallback para método tradicional
                this.elements.passwordOutput.select();
                document.execCommand('copy');
                window.getSelection().removeAllRanges();
            }

            // Feedback visual
            this.showCopySuccess();
            this.showNotification('Senha copiada para a área de transferência!', 'success');

        } catch (error) {
            console.error('Erro ao copiar senha:', error);
            
            // Tentar método de fallback
            try {
                this.elements.passwordOutput.select();
                document.execCommand('copy');
                window.getSelection().removeAllRanges();
                this.showCopySuccess();
                this.showNotification('Senha copiada!', 'success');
            } catch (fallbackError) {
                this.showNotification('Erro ao copiar. Selecione e copie manualmente.', 'error');
            }
        }
    }

    /**
     * Mostra feedback visual de cópia bem-sucedida
     */
    showCopySuccess() {
        this.elements.copyButton.classList.add('copy-success');
        
        if (this.state.copyTimeout) {
            clearTimeout(this.state.copyTimeout);
        }
        
        this.state.copyTimeout = setTimeout(() => {
            this.elements.copyButton.classList.remove('copy-success');
        }, 2000);
    }

    /**
     * Atualiza o indicador de força da senha
     */
    updateStrengthIndicator(password) {
        const score = this.calculatePasswordStrength(password);
        const strengthClasses = ['strength-weak', 'strength-fair', 'strength-good', 'strength-strong'];
        const strengthTexts = ['Muito Fraca', 'Fraca', 'Boa', 'Muito Forte'];
        
        // Remover classes anteriores
        strengthClasses.forEach(cls => {
            this.elements.strengthIndicator.classList.remove(cls);
        });
        
        // Adicionar nova classe
        let strengthIndex = Math.min(Math.floor(score / 25), 3);
        this.elements.strengthIndicator.classList.add(strengthClasses[strengthIndex]);
        this.elements.strengthText.textContent = strengthTexts[strengthIndex];
        
        // Animar barra de força
        setTimeout(() => {
            this.elements.strengthFill.style.width = `${Math.min(score, 100)}%`;
        }, 100);
    }

    /**
     * Calcula a força da senha (0-100)
     */
    calculatePasswordStrength(password) {
        let score = 0;
        const length = password.length;
        
        // Pontuação por comprimento
        if (length >= 8) score += 25;
        if (length >= 12) score += 15;
        if (length >= 16) score += 10;
        
        // Pontuação por variedade de caracteres
        if (/[a-z]/.test(password)) score += 10;
        if (/[A-Z]/.test(password)) score += 10;
        if (/[0-9]/.test(password)) score += 10;
        if (/[^a-zA-Z0-9]/.test(password)) score += 15;
        
        // Pontuação por complexidade adicional
        const uniqueChars = new Set(password).size;
        if (uniqueChars / length > 0.7) score += 10;
        
        // Verificar padrões repetitivos
        if (!this.hasRepeatingPatterns(password)) score += 5;
        
        return Math.min(score, 100);
    }

    /**
     * Verifica se há padrões repetitivos na senha
     */
    hasRepeatingPatterns(password) {
        // Verificar caracteres repetidos consecutivos
        for (let i = 0; i < password.length - 2; i++) {
            if (password[i] === password[i + 1] && password[i + 1] === password[i + 2]) {
                return true;
            }
        }
        
        // Verificar sequências simples
        const sequences = ['123', 'abc', 'ABC', 'qwe', 'QWE'];
        for (let seq of sequences) {
            if (password.includes(seq)) {
                return true;
            }
        }
        
        return false;
    }

    /**
     * Exibe notificações temporárias
     */
    showNotification(message, type = 'info') {
        // Remover notificação anterior se existir
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Criar nova notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos da notificação
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 24px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            fontSize: '14px',
            zIndex: '10000',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease-out',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });

        // Cores por tipo
        const colors = {
            success: 'linear-gradient(135deg, #10B981, #059669)',
            error: 'linear-gradient(135deg, #EF4444, #DC2626)',
            warning: 'linear-gradient(135deg, #F59E0B, #D97706)',
            info: 'linear-gradient(135deg, #8B5CF6, #6D28D9)'
        };

        notification.style.background = colors[type] || colors.info;
        
        // Adicionar ao DOM
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover automaticamente
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    /**
     * Adiciona animação de fade-in inicial
     */
    addFadeInAnimation() {
        const elements = [
            this.elements.passwordOutput.parentNode,
            document.querySelector('.controls'),
            document.querySelector('.strength-indicator')
        ];

        elements.forEach((el, index) => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'all 0.6s ease-out';
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 200 + (index * 100));
            }
        });
    }

    /**
     * Método utilitário para debug
     */
    getStats() {
        return {
            currentPasswordLength: this.state.currentPassword.length,
            currentPasswordStrength: this.calculatePasswordStrength(this.state.currentPassword),
            selectedOptions: {
                uppercase: this.elements.includeUppercase.checked,
                lowercase: this.elements.includeLowercase.checked,
                numbers: this.elements.includeNumbers.checked,
                symbols: this.elements.includeSymbols.checked
            }
        };
    }
}

// Utilitários globais
const Utils = {
    /**
     * Debounce function para otimizar performance
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Verifica se o dispositivo é móvel
     */
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    /**
     * Verifica suporte a recursos do navegador
     */
    checkBrowserSupport() {
        return {
            crypto: !!(window.crypto && window.crypto.getRandomValues),
            clipboard: !!(navigator.clipboard && navigator.clipboard.writeText),
            localStorage: !!window.localStorage
        };
    }
};

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando aplicação...');
    
    // Verificar suporte do navegador
    const support = Utils.checkBrowserSupport();
    
    if (!support.crypto) {
        console.warn('⚠️ Crypto API não suportada. Usando Math.random como fallback.');
    }
    
    if (!support.clipboard) {
        console.warn('⚠️ Clipboard API não suportada. Usando execCommand como fallback.');
    }

    // Verificar se os elementos DOM existem
    const requiredElements = ['passwordOutput', 'copyButton', 'generateButton', 'passwordLength', 'lengthValue'];
    let allElementsFound = true;
    
    requiredElements.forEach(id => {
        if (!document.getElementById(id)) {
            console.error(`❌ Elemento não encontrado: ${id}`);
            allElementsFound = false;
        }
    });

    if (!allElementsFound) {
        console.error('❌ Alguns elementos DOM não foram encontrados!');
        return;
    }

    // Inicializar gerador de senhas
    try {
        window.passwordGenerator = new PasswordGenerator();
        console.log('✅ Gerador de senhas inicializado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao inicializar gerador:', error);
    }
    
    // Adicionar informações de debug no console
    console.log('🔐 Gerador de Senhas Seguras iniciado');
    console.log('📊 Suporte do navegador:', support);
    console.log('💡 Use passwordGenerator.getStats() para ver estatísticas');
});

// Service Worker para PWA (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registrado com sucesso:', registration.scope);
            })
            .catch(function(error) {
                console.log('Falha ao registrar SW:', error);
            });
    });
}