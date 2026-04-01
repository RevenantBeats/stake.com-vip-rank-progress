/**
 * Options page script for VIP Rank Progress extension
 */

const autoClaimToggle = document.getElementById('autoClaimToggle');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');
const statusMessage = document.getElementById('statusMessage');

/**
 * Load saved settings from storage
 */
function loadSettings() {
    chrome.storage.sync.get('autoClaimEnabled', function(data) {
        autoClaimToggle.checked = data.autoClaimEnabled || false;
    });
}

/**
 * Show a status message
 * @param {string} message - The message to display
 * @param {string} type - The type of message ('success' or 'error')
 */
function showStatus(message, type = 'success') {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
    
    setTimeout(() => {
        statusMessage.className = 'status-message';
    }, 3000);
}

/**
 * Save settings to storage
 */
function saveSettings() {
    const settings = {
        autoClaimEnabled: autoClaimToggle.checked
    };
    
    chrome.storage.sync.set(settings, function() {
        if (chrome.runtime.lastError) {
            showStatus('Error saving settings', 'error');
        } else {
            showStatus('Settings saved successfully!', 'success');
        }
    });
}

/**
 * Reset settings to default
 */
function resetSettings() {
    autoClaimToggle.checked = false;
    chrome.storage.sync.set({ autoClaimEnabled: false }, function() {
        if (chrome.runtime.lastError) {
            showStatus('Error resetting settings', 'error');
        } else {
            showStatus('Settings reset to default', 'success');
        }
    });
}

// Event listeners
saveBtn.addEventListener('click', saveSettings);
resetBtn.addEventListener('click', resetSettings);

// Load settings when page loads
document.addEventListener('DOMContentLoaded', loadSettings);
