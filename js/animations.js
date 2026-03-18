/**
 * Career Launch Services - Advanced Animation Controller
 * Handles the "Problem Section" sequence from the sketch.
 */

const ATSAnimationController = {
    // 1. SELECTORS
    scannerContainer: document.querySelector('.ats-scanner'),
    scanLine: document.querySelector('.scan-line'),
    rejectedStamp: document.querySelector('.status-stamp--rejected'),
    shortlistedStamp: document.querySelector('.status-stamp--shortlisted'),
    trapItems: document.querySelectorAll('.trap-item'),

    // 2. INITIALIZE
    init() {
        if (!this.scannerContainer) return;
        this.startSequence();
    },

    // 3. THE MAIN SEQUENCE
    // We use a recursive loop to keep the "story" playing
    async startSequence() {
        while (true) {
            // STEP A: Reset state
            this.resetAll();
            await this.delay(500);

            // STEP B: The "Scan" begins
            // As the line moves down, we "fix" the trap items one by one
            for (let i = 0; i < this.trapItems.length; i++) {
                await this.delay(800); 
                this.markTrapFixed(this.trapItems[i]);
            }

            // STEP C: Show the REJECTED stamp (The "Dark" phase)
            this.rejectedStamp.style.opacity = '1';
            this.rejectedStamp.style.transform = 'translate(-50%, -50%) rotate(-15deg) scale(1)';
            await this.delay(2000);

            // STEP D: The "Transformation" (The "Launch" phase)
            this.rejectedStamp.style.opacity = '0';
            this.shortlistedStamp.style.opacity = '1';
            this.shortlistedStamp.style.transform = 'translate(-50%, -50%) rotate(-10deg) scale(1)';
            
            // Add a glow to the scanner window when success happens
            this.scannerContainer.style.boxShadow = '0 0 30px var(--gold-glow)';
            
            await this.delay(3000); // Hold the success screen
        }
    },

    // 4. HELPER METHODS
    markTrapFixed(item) {
        item.style.borderColor = 'var(--gold-primary)';
        item.style.backgroundColor = 'rgba(197, 160, 89, 0.1)';
        const icon = item.querySelector('span');
        if (icon) {
            icon.innerHTML = '✓';
            icon.style.color = 'var(--gold-primary)';
        }
    },

    resetAll() {
        this.rejectedStamp.style.opacity = '0';
        this.rejectedStamp.style.transform = 'translate(-50%, -50%) rotate(-15deg) scale(3)';
        this.shortlistedStamp.style.opacity = '0';
        this.shortlistedStamp.style.transform = 'translate(-50%, -50%) rotate(-10deg) scale(3)';
        this.scannerContainer.style.boxShadow = 'none';
        
        this.trapItems.forEach(item => {
            item.style.borderColor = 'rgba(255,255,255,0.1)';
            item.style.backgroundColor = 'transparent';
            const icon = item.querySelector('span');
            if (icon) icon.innerHTML = '✕';
        });
    },

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

// Start when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ATSAnimationController.init();
});