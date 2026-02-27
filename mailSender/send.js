const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const readline = require('readline');

const SENDER_EMAIL = 'hr@ignitershub.com'; 
let APP_PASSWORD = '';
const IMAGE_PATH = './image.jpeg';

const STUDENT_DETAILS = {
    name: "Bijay Sharma Neopaney",
    semester: "8th",
    branch: "Computer Engineering",
    rollNumber: "22CSEC06"
};


function promptUser(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

async function sendChallengeEmail() {
   
    APP_PASSWORD = await promptUser('Enter your Gmail App Password (16 characters): ');
    
    if (!APP_PASSWORD) {
        console.error('Error: App Password is required.');
        return;
    }

 
    const ext = path.extname(IMAGE_PATH).toLowerCase();
    const allowedExtensions = ['.png', '.jpg', '.jpeg'];

    if (!allowedExtensions.includes(ext)) {
        console.error(`Error: Invalid file type "${ext}". Only PNG, JPG, and JPEG are allowed.`);
        return;
    }

    if (!fs.existsSync(IMAGE_PATH)) {
        console.error(`Error: File not found at ${IMAGE_PATH}`);
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: SENDER_EMAIL,
            pass: APP_PASSWORD
        }
    });

    const emailBody = `
Hello,

Please find my details for the challenge below:

1. Name: ${STUDENT_DETAILS.name}
2. Semester: ${STUDENT_DETAILS.semester}
3. Branch: ${STUDENT_DETAILS.branch}
4. Roll Number: ${STUDENT_DETAILS.rollNumber}

Please find the required image attached to this email.

Best regards,
${STUDENT_DETAILS.name}
    `;

    const mailOptions = {
        from: SENDER_EMAIL,
        to: 'bijays2003@gmail.com',
        subject: 'Challenge 3 Completed',
        text: emailBody.trim(),
        attachments: [
            {
                filename: path.basename(IMAGE_PATH),
                path: IMAGE_PATH
            }
        ]
    };


    try {
        console.log('Sending email...');
        const info = await transporter.sendMail(mailOptions);
        console.log(`Success! Email sent. Message ID: ${info.messageId}`);
    } catch (error) {
        console.error('Failed to send email:', error);
    }
}

// Run the function
sendChallengeEmail();
