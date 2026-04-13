import "dotenv/config";
import { createDevBot } from "./devBotFramework.js";

async function main() {
  const bot = await createDevBot({
    token: process.env.TELEGRAM_BOT_TOKEN!,
    ownerId: parseInt(process.env.TELEGRAM_OWNER_ID!, 10),
    workspaceRoot: process.env.WORKSPACE_ROOT || "/Volumes/SAMSUNG 500gb/Antigravity/CleanSweep",
    workspaceName: "CleanSweep",
    firebaseProjectId: "studio-3673070449-f277c",
  });

  console.log("🧹 CleanSweep Dev Bot starting...");

  // Retry with increasing backoff to handle 409 conflicts
  // (occurs when a cloud-deployed instance is also polling)
  const maxRetries = 10;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await bot.start({
        drop_pending_updates: true,
        onStart: () => console.log(`✅ @CleanSweepDevBot is running (attempt ${attempt})`),
      });
      break; // Start succeeded and is now polling
    } catch (err: any) {
      if (err.error_code === 409 && attempt < maxRetries) {
        const delay = Math.min(attempt * 5, 30);
        console.log(`⚠️ 409 conflict (attempt ${attempt}/${maxRetries}). Retrying in ${delay}s...`);
        await new Promise(r => setTimeout(r, delay * 1000));
        continue;
      }
      throw err;
    }
  }
}

main().catch((err) => {
  console.error("❌ Bot error:", err.message || err);
  process.exit(1);
});
