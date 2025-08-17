// Academic Research Platform JavaScript

// Sample data from the provided JSON
const sampleData = {
    sampleJournals: [
        {
            name: "International Journal of Humanities and Social Sciences",
            impact_factor: "2.45",
            acceptance_rate: "25%",
            submission_fee: "$150",
            specialization: "General Humanities"
        },
        {
            name: "Arabic Studies Quarterly", 
            impact_factor: "1.89",
            acceptance_rate: "30%",
            submission_fee: "$100",
            specialization: "Arabic Literature"
        },
        {
            name: "Journal of Middle Eastern Studies",
            impact_factor: "3.12", 
            acceptance_rate: "18%",
            submission_fee: "$200",
            specialization: "Regional Studies"
        }
    ],
    trainingCourses: [
        {
            title: "الكتابة الأكاديمية باللغة الإنجليزية",
            duration: "8 أسابيع",
            level: "متوسط",
            enrollment: "245 طالب",
            category: "writing"
        },
        {
            title: "منهجية البحث في العلوم الإنسانية",
            duration: "6 أسابيع", 
            level: "مبتدئ",
            enrollment: "189 طالب",
            category: "research"
        },
        {
            title: "هندسة الأوامر للباحثين",
            duration: "4 أسابيع",
            level: "متقدم", 
            enrollment: "67 طالب",
            category: "ai"
        },
        {
            title: "النشر في المجلات الدولية",
            duration: "5 أسابيع",
            level: "متوسط",
            enrollment: "123 طالب",
            category: "publishing"
        },
        {
            title: "استخدام الذكاء الاصطناعي في البحث",
            duration: "3 أسابيع",
            level: "متقدم",
            enrollment: "89 طالب",
            category: "ai"
        },
        {
            title: "أساسيات البحث العلمي",
            duration: "4 أسابيع",
            level: "مبتدئ",
            enrollment: "312 طالب",
            category: "research"
        }
    ],
    subscriptionPlans: [
        {
            name: "طالب",
            price: "$15",
            yearlyPrice: "$144",
            features: ["أدوات الذكاء الاصطناعي الأساسية", "100 رصيد ذكي", "دعم عبر البريد الإلكتروني", "مساحة تخزين 5 جيجابايت"]
        },
        {
            name: "أكاديمي", 
            price: "$45",
            yearlyPrice: "$432",
            features: ["وصول كامل للذكاء الاصطناعي", "500 رصيد ذكي", "دعم أولوية", "مساحة تخزين 25 جيجابايت", "أدوات التعاون"],
            popular: true
        },
        {
            name: "مميز",
            price: "$85",
            yearlyPrice: "$816",
            features: ["جميع الميزات", "1000 رصيد ذكي", "دعم VIP", "مساحة تخزين 50 جيجابايت", "ميزات تجريبية"]
        }
    ]
};

// AI Assistant responses
const aiResponses = {
    "literature-review": "يمكنني مساعدتك في إجراء مراجعة شاملة للأدبيات. سأبحث عن أحدث الدراسات في مجالك وأقدم لك ملخصاً منظماً للنتائج الرئيسية والفجوات البحثية.",
    "methodology": "بناءً على موضوع بحثك، أقترح استخدام منهجية مختلطة تجمع بين البحث الكمي والنوعي. يمكنني مساعدتك في تصميم أدوات جمع البيانات المناسبة.",
    "citations": "سأساعدك في تنسيق المراجع والاستشهادات وفقاً لنمط APA أو أي نمط آخر تفضله. كما يمكنني التحقق من دقة الاستشهادات.",
    "outline": "دعني أساعدك في إنشاء مخطط منطقي لبحثك يتضمن: المقدمة، مراجعة الأدبيات، المنهجية، النتائج، المناقشة، والخاتمة."
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupTabNavigation();
    setupAIAssistant();
    setupPlagiarismChecker();
    setupJournalRecommendation();
    setupTranslationServices();
    setupTrainingCourses();
    setupSubscriptionPlans();
    setupProfileManagement();
    initializeInteractiveElements();
}

// Tab Navigation - Fixed
function setupTabNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Debug: Log available tabs
    console.log('Available nav buttons:', Array.from(navButtons).map(btn => btn.getAttribute('data-tab')));
    console.log('Available tab contents:', Array.from(tabContents).map(tab => tab.id));

    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const targetTab = button.getAttribute('data-tab');
            console.log('Clicked tab:', targetTab);
            
            // Remove active class from all buttons and tabs
            navButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Find and show the corresponding tab
            const targetTabElement = document.getElementById(targetTab);
            if (targetTabElement) {
                targetTabElement.classList.add('active');
                console.log('Activated tab:', targetTab);
            } else {
                console.error('Tab element not found:', targetTab);
            }
        });
    });
}

// AI Assistant
function setupAIAssistant() {
    const aiInput = document.getElementById('ai-input');
    const sendBtn = document.getElementById('ai-send-btn');
    const chatMessages = document.getElementById('ai-chat-messages');
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');

    if (sendBtn) {
        sendBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sendAIMessage();
        });
    }
    
    if (aiInput) {
        aiInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendAIMessage();
            }
        });
    }

    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const action = btn.getAttribute('data-action');
            handleQuickAction(action);
        });
    });

    function sendAIMessage() {
        const message = aiInput.value.trim();
        if (!message) return;

        // Add user message
        addChatMessage(message, 'user');
        
        // Clear input
        aiInput.value = '';

        // Simulate AI response
        setTimeout(() => {
            const response = generateAIResponse(message);
            addChatMessage(response, 'ai');
        }, 1000);
    }

    function addChatMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = sender === 'ai' ? 'ai-message' : 'user-message';
        
        const icon = sender === 'ai' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        messageDiv.innerHTML = `
            ${icon}
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function generateAIResponse(message) {
        const responses = [
            "شكراً لسؤالك. بناءً على تحليل المحتوى، أقترح عليك البدء بمراجعة الأدبيات الحديثة في هذا المجال.",
            "يمكنني مساعدتك في تطوير منهجية بحث قوية. ما هو نوع البيانات التي تخطط لجمعها؟",
            "هذا موضوع شيق للبحث. دعني أقترح عليك بعض المجلات المناسبة للنشر في هذا المجال.",
            "لتحسين جودة البحث، أنصحك بالتركيز على الجوانب المنهجية والتأكد من وضوح الأهداف البحثية."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    function handleQuickAction(action) {
        const response = aiResponses[action] || "سأساعدك في هذا الموضوع. يرجى تقديم المزيد من التفاصيل.";
        addChatMessage(response, 'ai');
    }
}

// Plagiarism Checker
function setupPlagiarismChecker() {
    const checkBtn = document.getElementById('check-plagiarism-btn');
    const textArea = document.getElementById('plagiarism-text');
    const resultsDiv = document.getElementById('plagiarism-results');
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-upload');

    if (checkBtn) {
        checkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const text = textArea.value.trim();
            if (text.length < 10) {
                alert('يرجى إدخال نص أطول للفحص (على الأقل 10 كلمات)');
                return;
            }
            simulatePlagiarismCheck();
        });
    }

    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                simulateFileUpload(file);
            }
        });
    }

    if (uploadArea) {
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--color-primary)';
        });

        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--color-border)';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                simulateFileUpload(files[0]);
            }
        });
    }

    function simulatePlagiarismCheck() {
        checkBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الفحص...';
        checkBtn.disabled = true;

        setTimeout(() => {
            const similarityPercentage = Math.floor(Math.random() * 20) + 5; // 5-25%
            displayPlagiarismResults(similarityPercentage);
            
            checkBtn.innerHTML = '<i class="fas fa-search"></i> فحص الاستلال';
            checkBtn.disabled = false;
        }, 3000);
    }

    function simulateFileUpload(file) {
        textArea.value = `تم رفع الملف: ${file.name}\n\nهذا نص تجريبي لمحاكاة محتوى الملف المرفوع. في التطبيق الحقيقي، سيتم استخراج النص من الملف وعرضه هنا للفحص.`;
    }

    function displayPlagiarismResults(percentage) {
        const circle = document.getElementById('similarity-circle');
        const percentageSpan = document.getElementById('similarity-percentage');
        
        if (circle && percentageSpan) {
            percentageSpan.textContent = `${percentage}%`;
            circle.style.background = `conic-gradient(var(--color-warning) 0% ${percentage}%, var(--color-bg-2) ${percentage}% 100%)`;
        }
        
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

// Journal Recommendation
function setupJournalRecommendation() {
    const journalForm = document.getElementById('journal-form');
    const journalResults = document.getElementById('journal-results');
    const journalCards = document.getElementById('journal-cards');

    if (journalForm) {
        journalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const title = document.getElementById('paper-title').value;
            const field = document.getElementById('research-field').value;
            
            if (!title || !field) {
                alert('يرجى ملء عنوان البحث والمجال البحثي');
                return;
            }
            
            simulateJournalSearch();
        });
    }

    function simulateJournalSearch() {
        journalCards.innerHTML = '<div class="loading">جاري البحث عن المجلات المناسبة...</div>';
        journalResults.style.display = 'block';
        journalResults.scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
            displayJournalResults();
        }, 2000);
    }

    function displayJournalResults() {
        journalCards.innerHTML = '';
        
        sampleData.sampleJournals.forEach(journal => {
            const card = document.createElement('div');
            card.className = 'journal-card';
            card.innerHTML = `
                <h4>${journal.name}</h4>
                <div class="journal-info">
                    <div class="journal-info-item">
                        <span>معامل التأثير:</span>
                        <span>${journal.impact_factor}</span>
                    </div>
                    <div class="journal-info-item">
                        <span>معدل القبول:</span>
                        <span>${journal.acceptance_rate}</span>
                    </div>
                    <div class="journal-info-item">
                        <span>رسوم النشر:</span>
                        <span>${journal.submission_fee}</span>
                    </div>
                    <div class="journal-info-item">
                        <span>التخصص:</span>
                        <span>${journal.specialization}</span>
                    </div>
                </div>
                <button class="btn btn--primary btn--full-width">عرض تفاصيل المجلة</button>
            `;
            journalCards.appendChild(card);
        });
    }
}

// Translation Services
function setupTranslationServices() {
    const sourceText = document.getElementById('source-text');
    const targetText = document.getElementById('target-text');
    const translateBtn = document.getElementById('translate-btn');
    const copyBtn = document.getElementById('copy-translation');
    const swapBtn = document.getElementById('swap-languages');
    const sourceLanguage = document.getElementById('source-language');
    const targetLanguage = document.getElementById('target-language');
    const wordCount = document.getElementById('source-word-count');

    if (sourceText && wordCount) {
        sourceText.addEventListener('input', () => {
            const words = sourceText.value.trim().split(/\s+/).length;
            wordCount.textContent = sourceText.value.trim() ? `${words} كلمة` : '0 كلمة';
        });
    }

    if (translateBtn) {
        translateBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const text = sourceText.value.trim();
            if (!text) {
                alert('يرجى إدخال النص المراد ترجمته');
                return;
            }
            simulateTranslation(text);
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (targetText.value) {
                navigator.clipboard.writeText(targetText.value).then(() => {
                    copyBtn.innerHTML = '<i class="fas fa-check"></i> تم النسخ';
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="fas fa-copy"></i> نسخ';
                    }, 2000);
                });
            }
        });
    }

    if (swapBtn) {
        swapBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const sourceLang = sourceLanguage.value;
            const targetLang = targetLanguage.value;
            
            sourceLanguage.value = targetLang;
            targetLanguage.value = sourceLang;
            
            const sourceTextValue = sourceText.value;
            const targetTextValue = targetText.value;
            
            sourceText.value = targetTextValue;
            targetText.value = sourceTextValue;
        });
    }

    function simulateTranslation(text) {
        translateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الترجمة...';
        translateBtn.disabled = true;
        targetText.value = '';

        setTimeout(() => {
            // Simulate translation
            const translations = {
                'ar-en': 'This is a simulated translation of your Arabic text into English. In a real application, this would be powered by advanced AI translation models.',
                'en-ar': 'هذه ترجمة محاكاة للنص الإنجليزي إلى العربية. في التطبيق الحقيقي، ستكون مدعومة بنماذج ترجمة ذكية متقدمة.'
            };
            
            const langPair = `${sourceLanguage.value}-${targetLanguage.value}`;
            targetText.value = translations[langPair] || 'ترجمة محاكاة للنص المدخل.';
            
            translateBtn.innerHTML = '<i class="fas fa-language"></i> ترجم';
            translateBtn.disabled = false;
        }, 2000);
    }
}

// Training Courses
function setupTrainingCourses() {
    const coursesGrid = document.getElementById('courses-grid');
    const categoryBtns = document.querySelectorAll('.category-btn');

    displayCourses('all');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            displayCourses(category);
        });
    });

    function displayCourses(category) {
        const filteredCourses = category === 'all' 
            ? sampleData.trainingCourses 
            : sampleData.trainingCourses.filter(course => course.category === category);

        coursesGrid.innerHTML = '';

        filteredCourses.forEach(course => {
            const card = document.createElement('div');
            card.className = 'course-card';
            card.innerHTML = `
                <div class="course-header">
                    <h4>${course.title}</h4>
                </div>
                <div class="course-body">
                    <div class="course-meta">
                        <span>${course.duration}</span>
                        <span class="course-level">${course.level}</span>
                    </div>
                    <p>المسجلون: ${course.enrollment}</p>
                    <button class="btn btn--primary btn--full-width">التسجيل في الدورة</button>
                </div>
            `;
            coursesGrid.appendChild(card);
        });
    }
}

// Subscription Plans
function setupSubscriptionPlans() {
    const pricingCards = document.getElementById('pricing-cards');
    const billingToggle = document.getElementById('billing-toggle');
    const startTrialBtn = document.getElementById('start-trial-btn');

    displayPricingCards(false); // Start with monthly pricing

    if (billingToggle) {
        billingToggle.addEventListener('change', (e) => {
            displayPricingCards(e.target.checked);
        });
    }

    if (startTrialBtn) {
        startTrialBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('تم تفعيل التجربة المجانية لمدة أسبوع! مرحباً بك في منصة البحث العلمي.');
        });
    }

    function displayPricingCards(isYearly) {
        pricingCards.innerHTML = '';

        sampleData.subscriptionPlans.forEach(plan => {
            const card = document.createElement('div');
            card.className = `pricing-card ${plan.popular ? 'popular' : ''}`;
            
            const price = isYearly ? plan.yearlyPrice : plan.price;
            const period = isYearly ? '/سنة' : '/شهر';

            card.innerHTML = `
                <div class="pricing-header">
                    <h3>${plan.name}</h3>
                    <div class="pricing-price">${price}${period}</div>
                </div>
                <ul class="pricing-features">
                    ${plan.features.map(feature => `
                        <li><i class="fas fa-check"></i> ${feature}</li>
                    `).join('')}
                </ul>
                <button class="btn btn--primary btn--full-width">اختيار هذه الخطة</button>
            `;
            pricingCards.appendChild(card);
        });
    }
}

// Profile Management
function setupProfileManagement() {
    const changeAvatarBtn = document.querySelector('.change-avatar-btn');
    const profileImage = document.getElementById('profile-image');

    if (changeAvatarBtn) {
        changeAvatarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Simulate avatar change
            const avatars = [
                'https://pplx-res.cloudinary.com/image/upload/v1755461725/pplx_project_search_images/e9de16eedaa56ebe1857059201c4e2e6e3b3ad7f.png',
                'https://pplx-res.cloudinary.com/image/upload/v1755461725/pplx_project_search_images/0ac6d733b51a43e7340acfa26063f71df5736970.png'
            ];
            
            const currentSrc = profileImage.src;
            const newSrc = avatars.find(avatar => avatar !== currentSrc) || avatars[0];
            profileImage.src = newSrc;
        });
    }

    // Save profile changes
    const saveProfileBtn = document.querySelector('.profile-actions .btn--primary');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('تم حفظ التغييرات بنجاح!');
        });
    }
}

// Utility Functions
function showLoading(element, text = 'جاري التحميل...') {
    element.innerHTML = `<div class="loading"><i class="fas fa-spinner fa-spin"></i> ${text}</div>`;
}

function hideLoading(element) {
    const loading = element.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

// Initialize tooltips and other interactive elements
function initializeInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card, .stat-card, .journal-card, .course-card, .pricing-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-8);
        padding: var(--space-20);
        color: var(--color-text-secondary);
    }
`;
document.head.appendChild(style);