(async function withdrawWithAutoConfirm() {
    const cards = Array.from(document.querySelectorAll('li.invitation-card, div.invitation-card'));
    let count = 0;

    for (const card of cards) {
        const withdrawBtn = card.querySelector('button[aria-label^="Withdraw"]');
        if (!withdrawBtn) continue;

        console.log(`Withdrawing invite ${count + 1}: ${card.innerText.slice(0, 80)}...`);
        withdrawBtn.click();
        count++;

        // Wait for popup to appear
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Try clicking the confirm button repeatedly until it disappears
        let confirmClicked = false;
        for (let i = 0; i < 10; i++) {
            const confirmBtn = document.querySelector('button.artdeco-button--danger');
            if (confirmBtn && confirmBtn.offsetParent !== null) {
                confirmBtn.click();
                confirmClicked = true;
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        if (!confirmClicked) {
            console.warn("⚠️ Could not auto-confirm withdrawal. Please check manually.");
        }

        // Wait before next iteration to avoid rate-limiting
        await new Promise(resolve => setTimeout(resolve, 1500));
    }

    alert(`✅ Done. ${count} invites withdrawn (auto-confirmed).`);
})();
