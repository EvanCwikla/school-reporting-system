'use server'

export async function submitReport(formData: any) {
  try {
    console.log("Processing report with Simulated AI...");

    // Mock AI Logic: We categorize based on keywords if the API is unavailable
    const desc = formData.description.toLowerCase();
    let analysis = {
      severity: "Low",
      action: "Monitor situation and log in student file.",
      summary: "Standard report regarding " + formData.category.toLowerCase() + "."
    };

    if (desc.includes("weapon") || desc.includes("hurt") || desc.includes("kill")) {
      analysis.severity = "High";
      analysis.action = "IMMEDIATE: Notify onsite security and principal.";
      analysis.summary = "Urgent safety threat involving potential violence.";
    } else if (desc.includes("crying") || desc.includes("sad") || desc.includes("alone")) {
      analysis.severity = "Medium";
      analysis.action = "Schedule meeting with school counselor.";
      analysis.summary = "Mental health concern requiring emotional support.";
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    return { 
      success: true, 
      analysis: analysis 
    };

  } catch (error) {
    return { success: false };
  }
}