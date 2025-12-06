
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface InternData {
  applicationId: string;
  name: string;
  email: string;
  phone: string;
  university: string;
  program: string;
  status: string;
  submittedDate: string;
  expectedDecision: string;
  startDate?: string;
  endDate?: string;
}

const createCertificateHTML = (internData: InternData): string => {
  return `
  <div class="max-w-6xl mx-auto flex flex-col md:flex-row p-8 relative">
  <div class="flex flex-col max-w-3xl space-y-6">
    <div class="flex items-center space-x-4">
      <img
        src="https://i.postimg.cc/43nP784d/Whats-App-Image-2025-07-20-at-12-00-05-PM.jpg""
        alt="Logo with blue angled brackets symbol"
        class="w-10 h-10 object-contain"
        width="40"
        height="40"
      />
      <div>
        <h1 class="text-3xl font-extrabold leading-tight">ANON</h1>
        <p class="italic text-sm mt-0.5">Empowering Future Innovators</p>
      </div>
    </div>

    <h2 class="text-xl font-normal">CERTIFICATE OF COMPLETION</h2>

    <p class="text-base leading-relaxed">
      This certifies that <strong>${internData.name}</strong> has successfully completed the
      <strong>Web Development Internship Program at Next-Gen Developers</strong>, held from
      <strong>Day/M 2025</strong> to <strong>D/M 2025</strong>.
    </p>

    <p class="text-base leading-relaxed">
      During this time, the intern demonstrated applied skills in
      <strong>front-end and back-end development</strong>, responsive design, and collaborative problem-solving within a dynamic tech environment.
    </p>

    <p class="text-base leading-relaxed">
      We applaud their contribution and growth throughout the program.<br />
      <strong>Reference ID:</strong> NDG-WE-25-A2
    </p>

    <p class="italic mt-6">Issued by Next-Gen Developers</p>
  </div>

  <div class="flex flex-col justify-end items-center md:items-end max-w-xl w-full mt-12 md:mt-0 md:ml-auto">
    <img
      src="https://storage.googleapis.com/a1aa/image/6c52d8cd-3578-4974-471b-cd8a2c83f01a.jpg"
      alt="Signature of Authorized Signatory Sobia Kousar in white on black background"
      class="w-60 h-auto mb-2 object-contain"
      width="240"
      height="80"
    />
    <p class="text-center text-base leading-tight">
      Authorized Signatory<br />
      Sobia Kousar
    </p>
  </div>
</div>


  <div class="w-[297mm] h-[210mm] print:m-0" style="font-family: 'Arial', sans-serif;">
  <!-- Background Pattern -->
  <img src="/>

  <!-- Header -->
  <div class="relative z-10 flex items-center justify-between p-8">
    <div class="flex items-center space-x-6">
      <!-- Logo -->
      <div class="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
        <span class="text-white text-xl font-bold">&lt;&gt;</span>
      </div>
      <div>
        <h1 class="text-3xl font-bold text-white tracking-wide">ANON</h1>
        <p class="text-blue-200 text-sm italic mt-1">Empowering Future Innovators</p>
      </div>
    </div>
    <div class="text-right text-white">
      <p class="text-sm opacity-75">Certificate ID</p>
      <p class="font-mono text-lg">NDG-WE-25-A2</p>
    </div>
  </div>

  <!-- Main Content -->
  <div class="relative z-10 px-16 py-8">
    <!-- Certificate Title -->
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-white mb-4 tracking-wider">CERTIFICATE OF COMPLETION</h2>
      <div class="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
    </div>

    <!-- Certificate Body -->
    <div class="max-w-4xl mx-auto text-center space-y-6">
      <p class="text-xl text-blue-100">This certifies that</p>

      <!-- Intern Name -->
      <div class="my-8">
        <h3 class="text-5xl font-bold text-white mb-2 border-b-2 border-blue-400 pb-2 inline-block"></h3>
      </div>

      <p class="text-xl text-blue-100">has successfully completed the</p>

      <!-- Program Name -->
      <div class="my-6">
        <h4 class="text-3xl font-bold text-blue-300">Web Development Internship Program</h4>
      </div>

      <p class="text-lg text-blue-200">
        held from ${internData.startDate || 'June 2025'} to ${internData.endDate || 'August 2025'} at Next-Gen Developers, demonstrating applied skills in
        <span class="font-semibold text-white">front-end and back-end development</span>,
        responsive design, and collaborative problem-solving within a dynamic tech environment.
      </p>

      <p class="text-lg text-blue-200 mt-6">
        We applaud their contribution and growth throughout the program.
      </p>
    </div>

    <!-- Bottom Section -->
    <div class="flex justify-between items-end mt-16">
      <!-- Left Side - Date -->
      <div class="text-white">
        <p class="text-sm text-blue-200">Date of Completion</p>
        <p class="text-lg font-semibold">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <!-- Right Side - Signature -->
      <div class="text-right text-white">
        <div class="border-b-2 border-white w-48 mb-2"></div>
        <p class="text-lg font-semibold">Sobia Kosar</p>
        <p class="text-sm text-blue-200">Authorized Signatory</p>
        <p class="text-xs text-blue-300 mt-1">Next-Gen Developers</p>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="absolute bottom-4 left-0 right-0 text-center">
    <p class="text-xs text-blue-300">This certificate verifies the successful completion of the internship program at Next-Gen Developers</p>
  </div>
</div>

  `;
};

export const generateCertificate = async (internData: InternData): Promise<void> => {
  // Create a temporary div to hold the certificate HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = createCertificateHTML(internData);
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '-9999px';
  tempDiv.style.width = '297mm';
  tempDiv.style.height = '210mm';
  
  // Add Tailwind CSS classes by creating a temporary stylesheet
  const tempStyle = document.createElement('style');
  tempStyle.textContent = `
    @import url('https://cdn.tailwindcss.com');
  `;
  
  document.body.appendChild(tempStyle);
  document.body.appendChild(tempDiv);

  try {
    // Convert HTML to canvas
    const canvas = await html2canvas(tempDiv.firstElementChild as HTMLElement, {
      width: 1123, // A4 landscape width in pixels at 96 DPI
      height: 794,  // A4 landscape height in pixels at 96 DPI
      scale: 2,     // Higher resolution
      useCORS: true,
      backgroundColor: null
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    // Download the PDF
    pdf.save(`${internData.name}_Internship_Certificate.pdf`);
    
  } finally {
    // Clean up
    document.body.removeChild(tempDiv);
    document.body.removeChild(tempStyle);
  }
};

export const generateShareableLink = (internData: InternData): string => {
  const baseUrl = window.location.origin;
  const params = new URLSearchParams({
    id: internData.applicationId,
    name: internData.name,
    status: internData.status,
    program: internData.program
  });
  
  return `${baseUrl}/internship-verify?${params.toString()}`;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
};
