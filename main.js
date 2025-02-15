// Sample job data with KSH currency
const jobs = [
    {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'Tech Corp',
        category: 'technology',
        location: 'remote',
        description: 'We are looking for an experienced frontend developer with 5+ years of experience in React, Vue.js, and modern JavaScript. Must have strong UI/UX skills and experience with responsive design.',
        salary: 'KSH 180,000 - KSH 250,000',
        requirements: ['5+ years experience', 'React & Vue.js', 'UI/UX skills', 'Responsive design'],
        benefits: ['Health Insurance', 'Annual Bonus', 'Flexible Hours', 'Remote Work'],
        featured: true
    },
    {
        id: 2,
        title: 'Marketing Manager',
        company: 'Brand Solutions',
        category: 'marketing',
        location: 'onsite',
        description: 'Leading marketing initiatives and campaigns for major clients. Experience in digital marketing and team management required.',
        salary: 'KSH 150,000 - KSH 200,000',
        requirements: ['Digital Marketing', 'Team Management', 'Campaign Planning', 'Analytics'],
        benefits: ['Performance Bonus', 'Lunch Allowance', 'Training Budget'],
        featured: true
    },
    {
        id: 3,
        title: 'UI/UX Designer',
        company: 'Creative Studio',
        category: 'design',
        location: 'hybrid',
        description: 'Design beautiful and functional user interfaces for web and mobile applications.',
        salary: 'KSH 120,000 - KSH 180,000',
        requirements: ['Adobe Suite', 'Figma', 'User Research', 'Prototyping'],
        benefits: ['Design Tools Provided', 'Creative Environment', 'Healthcare'],
        featured: false
    },
    {
        id: 4,
        title: 'Backend Developer',
        company: 'Fintech Solutions',
        category: 'technology',
        location: 'remote',
        description: 'Develop and maintain scalable backend systems for financial applications.',
        salary: 'KSH 200,000 - KSH 300,000',
        requirements: ['Node.js', 'Python', 'AWS', 'Microservices'],
        benefits: ['Stock Options', 'Remote Work', '13th Month Pay'],
        featured: true
    },
    {
        id: 5,
        title: 'Sales Executive',
        company: 'Growth Corp',
        category: 'sales',
        location: 'hybrid',
        description: 'Drive business growth through B2B sales and relationship management.',
        salary: 'KSH 100,000 + Commission',
        requirements: ['B2B Sales', 'CRM Experience', 'Networking Skills'],
        benefits: ['High Commission', 'Car Allowance', 'Phone Allowance'],
        featured: false
    },
    {
        id: 6,
        title: 'Content Manager',
        company: 'Digital Media Ltd',
        category: 'marketing',
        location: 'onsite',
        description: 'Manage content strategy and team of writers for digital platforms.',
        salary: 'KSH 140,000 - KSH 180,000',
        requirements: ['Content Strategy', 'SEO Knowledge', 'Team Management'],
        benefits: ['Gym Membership', 'Healthcare', 'Training Budget'],
        featured: false
    }
];

// DOM Elements
const jobsList = document.getElementById('jobsList');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const locationFilter = document.getElementById('locationFilter');
const searchBtn = document.getElementById('searchBtn');
const postJobBtn = document.getElementById('postJobBtn');
const postJobModal = document.getElementById('postJobModal');
const applicationModal = document.getElementById('applicationModal');
const closeModals = document.querySelectorAll('.close');
const jobPostForm = document.getElementById('jobPostForm');
const applicationForm = document.getElementById('applicationForm');
const salaryFilter = document.getElementById('salaryFilter');

// Display featured jobs
function displayFeaturedJobs() {
    const featuredJobsContainer = document.querySelector('.featured-jobs .jobs-container');
    const featuredJobs = jobs.filter(job => job.featured);
    
    featuredJobsContainer.innerHTML = '';
    featuredJobs.forEach(job => {
        const jobCard = createJobCard(job, true);
        featuredJobsContainer.appendChild(jobCard);
    });
}

// Create job card
function createJobCard(job, isFeatured = false) {
    const jobCard = document.createElement('div');
    jobCard.className = `job-card ${isFeatured ? 'featured' : ''}`;
    jobCard.id = `job-${job.id}`;
    
    if (isFeatured) {
        jobCard.innerHTML = `<span class="featured-badge">Featured</span>`;
    }
    
    jobCard.innerHTML += `
        <h3>${job.title}</h3>
        <div class="job-meta">
            <p><strong>${job.company}</strong></p>
            <p><i class="fas fa-tag"></i> ${job.category} | <i class="fas fa-map-marker-alt"></i> ${job.location}</p>
            <p><i class="fas fa-money-bill-wave"></i> ${job.salary}</p>
        </div>
        <div class="job-description">
            <p>${job.description}</p>
        </div>
        <div class="job-requirements">
            <h4>Requirements:</h4>
            <ul>
                ${job.requirements.map(req => `<li>${req}</li>`).join('')}
            </ul>
        </div>
        <div class="job-benefits">
            <h4>Benefits:</h4>
            <ul>
                ${job.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
            </ul>
        </div>
        <button class="apply-btn" onclick="openApplicationForm(${job.id})">Apply Now</button>
        <button class="save-btn" onclick="saveJob(${job.id})"><i class="far fa-bookmark"></i> Save Job</button>
        <div class="job-actions">
            <button class="share-btn" onclick="shareJob(${job.id})">
                <i class="fas fa-share-alt"></i> Share
            </button>
        </div>
        <div class="job-view-count">0 views</div>
    `;
    
    setTimeout(() => {
        incrementJobView(job.id);
    }, 1000);
    
    return jobCard;
}

// Display jobs
function displayJobs(jobsToDisplay = jobs) {
    jobsList.innerHTML = '';
    jobsToDisplay.forEach(job => {
        const jobCard = createJobCard(job);
        jobsList.appendChild(jobCard);
    });
}

// Filter jobs
function filterJobs() {
    const searchTerm = searchInput.value.toLowerCase();
    const categoryValue = categoryFilter.value;
    const locationValue = locationFilter.value;
    const salaryValue = parseInt(salaryFilter.value) || 0;

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm) ||
                            job.company.toLowerCase().includes(searchTerm) ||
                            job.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryValue || job.category === categoryValue;
        const matchesLocation = !locationValue || job.location === locationValue;
        const matchesSalary = salaryValue === 0 || 
                             parseInt(job.salary.replace(/[^0-9]/g, '')) >= salaryValue;

        return matchesSearch && matchesCategory && matchesLocation && matchesSalary;
    });

    displayJobs(filteredJobs);
}

// Enhanced save job functionality
function saveJob(jobId) {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    if (!savedJobs.includes(jobId)) {
        savedJobs.push(jobId);
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
        alert('Job saved successfully!');
        updateSavedJobsBadge();
    } else {
        alert('Job already saved!');
    }
}

// Remove saved job
function removeSavedJob(jobId) {
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    savedJobs = savedJobs.filter(id => id !== jobId);
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    displaySavedJobs(); // Refresh the saved jobs display
    updateSavedJobsBadge();
}

// Update saved jobs badge
function updateSavedJobsBadge() {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const badge = document.getElementById('savedJobsBadge');
    if (badge) {
        badge.textContent = savedJobs.length;
        badge.style.display = savedJobs.length > 0 ? 'inline' : 'none';
    }
}

// Display saved jobs
function displaySavedJobs() {
    const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const mainContent = document.querySelector('main');
    const savedJobsContainer = document.querySelector('.saved-jobs-container');
    
    // Hide all other sections
    Array.from(mainContent.children).forEach(child => {
        if (child !== savedJobsContainer) {
            child.style.display = 'none';
        }
    });
    
    // Show saved jobs container
    savedJobsContainer.style.display = 'block';
    savedJobsContainer.innerHTML = '';
    
    if (savedJobIds.length === 0) {
        savedJobsContainer.innerHTML = `
            <div class="no-saved-jobs">
                <i class="far fa-bookmark fa-3x"></i>
                <h3>No Saved Jobs</h3>
                <p>Jobs you save will appear here</p>
            </div>
        `;
        return;
    }
    
    const savedJobsList = document.createElement('div');
    savedJobsList.className = 'jobs-container';
    
    savedJobIds.forEach(jobId => {
        const job = jobs.find(j => j.id === jobId);
        if (job) {
            const jobCard = createJobCard(job);
            // Add remove button
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-saved-job';
            removeBtn.innerHTML = '<i class="fas fa-trash"></i> Remove';
            removeBtn.onclick = () => removeSavedJob(job.id);
            jobCard.appendChild(removeBtn);
            savedJobsList.appendChild(jobCard);
        }
    });
    
    savedJobsContainer.appendChild(savedJobsList);
}

// Show main content
function showMainContent() {
    const mainContent = document.querySelector('main');
    Array.from(mainContent.children).forEach(child => {
        if (!child.classList.contains('saved-jobs-container')) {
            child.style.display = '';
        }
    });
    document.querySelector('.saved-jobs-container').style.display = 'none';
}

// Open application form
function openApplicationForm(jobId) {
    const job = jobs.find(j => j.id === jobId);
    document.getElementById('applicationJobTitle').textContent = job.title;
    document.getElementById('applicationCompany').textContent = job.company;
    applicationModal.style.display = 'block';
}

// Handle application form submission
applicationForm.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(applicationForm);
    // Here you would typically send this data to a server
    console.log('Application submitted:', Object.fromEntries(formData));
    alert('Application submitted successfully!');
    applicationModal.style.display = 'none';
    applicationForm.reset();
};

// Modal handling
postJobBtn.onclick = () => postJobModal.style.display = 'block';
closeModals.forEach(closeBtn => {
    closeBtn.onclick = () => {
        postJobModal.style.display = 'none';
        applicationModal.style.display = 'none';
    };
});

window.onclick = (event) => {
    if (event.target === postJobModal || event.target === applicationModal) {
        postJobModal.style.display = 'none';
        applicationModal.style.display = 'none';
    }
};

// Form submission
jobPostForm.onsubmit = (e) => {
    e.preventDefault();
    // Add form handling logic here
    alert('Job posted successfully!');
    postJobModal.style.display = 'none';
};

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with: ${email}`);
        newsletterForm.reset();
    });
}

// Event listeners
searchBtn.addEventListener('click', filterJobs);
searchInput.addEventListener('input', filterJobs);
categoryFilter.addEventListener('change', filterJobs);
locationFilter.addEventListener('change', filterJobs);
salaryFilter.addEventListener('change', filterJobs);

// Handle resume upload method change
document.getElementById('resumeMethod').addEventListener('change', (e) => {
    const manualInput = document.getElementById('manualResumeInput');
    const fileUpload = document.getElementById('resumeUpload');
    const driveLink = document.getElementById('driveLinkInput');
    
    manualInput.style.display = 'none';
    fileUpload.style.display = 'none';
    driveLink.style.display = 'none';
    
    switch(e.target.value) {
        case 'manual':
            manualInput.style.display = 'block';
            break;
        case 'upload':
            fileUpload.style.display = 'block';
            break;
        case 'drive':
            driveLink.style.display = 'block';
            break;
    }
});

// Setup job alerts
function setupJobAlerts() {
    const alertPreferences = {
        jobTypes: [],
        locations: [],
        salaryRange: '',
        frequency: 'daily'
    };
    
    // You would typically show a modal or form here to collect preferences
    alert('Job alerts feature coming soon! We\'ll notify you of new opportunities.');
}

// Quick apply functionality
function openQuickApply() {
    // You would typically show a simplified application modal here
    alert('Quick apply feature coming soon! Apply to multiple jobs with one click.');
}

// Filter by category
function filterByCategory(category) {
    categoryFilter.value = category.toLowerCase();
    filterJobs();
}

// Add click event listeners to category cards
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.querySelector('h4').textContent;
        filterByCategory(category);
    });
});

// Event listeners for saved jobs functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add saved jobs container
    const savedJobsContainer = document.createElement('div');
    savedJobsContainer.className = 'saved-jobs-container';
    document.querySelector('main').appendChild(savedJobsContainer);
    
    // Update saved jobs badge
    updateSavedJobsBadge();
    
    // Add event listeners for navigation
    document.getElementById('savedJobsBtn').addEventListener('click', (e) => {
        e.preventDefault();
        displaySavedJobs();
    });
    
    document.querySelector('nav a.active').addEventListener('click', (e) => {
        e.preventDefault();
        showMainContent();
    });
    
    createJobFilters();
});

// Initial display
displayFeaturedJobs();
displayJobs();

// Job Tips Learn More functionality
function showTipDetails(tipId) {
    const tipContent = {
        'cv': {
            title: 'Perfect Your CV - Complete Guide',
            content: `
                <h3>Key Elements of a Strong CV</h3>
                <ul>
                    <li>Professional Summary</li>
                    <li>Work Experience</li>
                    <li>Skills and Qualifications</li>
                    <li>Education</li>
                </ul>
                <h3>Tips for Writing</h3>
                <ul>
                    <li>Use action verbs</li>
                    <li>Quantify achievements</li>
                    <li>Tailor to job description</li>
                    <li>Keep it concise</li>
                </ul>
                <h3>Common Mistakes to Avoid</h3>
                <ul>
                    <li>Typos and grammatical errors</li>
                    <li>Generic descriptions</li>
                    <li>Irrelevant information</li>
                </ul>
            `
        },
        'interview': {
            title: 'Interview Preparation Guide',
            content: `
                <h3>Before the Interview</h3>
                <ul>
                    <li>Research the company</li>
                    <li>Practice common questions</li>
                    <li>Prepare questions to ask</li>
                </ul>
                <h3>During the Interview</h3>
                <ul>
                    <li>Use the STAR method</li>
                    <li>Show enthusiasm</li>
                    <li>Listen actively</li>
                </ul>
                <h3>Follow-up</h3>
                <ul>
                    <li>Send a thank-you note</li>
                    <li>Follow up on next steps</li>
                </ul>
            `
        },
        'salary': {
            title: 'Salary Negotiation Strategies',
            content: `
                <h3>Research Phase</h3>
                <ul>
                    <li>Industry standards</li>
                    <li>Company pay scales</li>
                    <li>Your market value</li>
                </ul>
                <h3>Negotiation Techniques</h3>
                <ul>
                    <li>Focus on value proposition</li>
                    <li>Consider total compensation</li>
                    <li>Use timing effectively</li>
                </ul>
                <h3>Common Mistakes</h3>
                <ul>
                    <li>Accepting first offer</li>
                    <li>Not negotiating benefits</li>
                    <li>Poor timing</li>
                </ul>
            `
        }
    };

    const modal = document.createElement('div');
    modal.className = 'tip-modal';
    modal.innerHTML = `
        <div class="tip-modal-content">
            <span class="close">&times;</span>
            <h2>${tipContent[tipId].title}</h2>
            <div class="tip-content">
                ${tipContent[tipId].content}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'block';

    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => {
        modal.remove();
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    };
}

// Enhanced Post Job Form Validation
function validatePostJobForm(formData) {
    const errors = [];
    const requiredFields = ['title', 'company', 'category', 'location', 'description', 'salary'];
    
    requiredFields.forEach(field => {
        if (!formData.get(field)) {
            errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        }
    });

    if (formData.get('description').length < 100) {
        errors.push('Job description must be at least 100 characters');
    }

    return errors;
}

// Share job functionality
function shareJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
        if (navigator.share) {
            navigator.share({
                title: `${job.title} at ${job.company}`,
                text: `Check out this job opportunity: ${job.title} at ${job.company}`,
                url: window.location.href
            }).catch(console.error);
        } else {
            // Fallback for browsers that don't support Web Share API
            const shareText = `${job.title} at ${job.company}\n${window.location.href}`;
            navigator.clipboard.writeText(shareText)
                .then(() => alert('Job link copied to clipboard!'))
                .catch(() => alert('Failed to copy job link'));
        }
    }
}

// View counter for jobs
const viewCounts = JSON.parse(localStorage.getItem('jobViews') || '{}');

function incrementJobView(jobId) {
    viewCounts[jobId] = (viewCounts[jobId] || 0) + 1;
    localStorage.setItem('jobViews', JSON.stringify(viewCounts));
    updateJobViewCount(jobId);
}

function updateJobViewCount(jobId) {
    const viewCountElement = document.querySelector(`#job-${jobId} .job-view-count`);
    if (viewCountElement) {
        const views = viewCounts[jobId] || 0;
        viewCountElement.textContent = `${views} ${views === 1 ? 'view' : 'views'}`;
    }
}

const jobFilters = [
    { id: 'all', label: 'All Jobs' },
    { id: 'recent', label: 'Most Recent' },
    { id: 'highPaying', label: 'High Paying' },
    { id: 'remote', label: 'Remote Only' }
];

function createJobFilters() {
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'job-filters';
    
    jobFilters.forEach(filter => {
        const chip = document.createElement('button');
        chip.className = 'filter-chip';
        chip.textContent = filter.label;
        chip.onclick = () => applyJobFilter(filter.id);
        filtersContainer.appendChild(chip);
    });
    
    const searchSection = document.querySelector('.search-section');
    searchSection.insertBefore(filtersContainer, searchSection.firstChild);
}

function applyJobFilter(filterId) {
    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach(chip => chip.classList.remove('active'));
    event.target.classList.add('active');
    
    let filteredJobs = [...jobs];
    
    switch(filterId) {
        case 'recent':
            filteredJobs.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'highPaying':
            filteredJobs.sort((a, b) => {
                const salaryA = parseInt(a.salary.replace(/[^0-9]/g, ''));
                const salaryB = parseInt(b.salary.replace(/[^0-9]/g, ''));
                return salaryB - salaryA;
            });
            break;
        case 'remote':
            filteredJobs = filteredJobs.filter(job => job.location.toLowerCase() === 'remote');
            break;
    }
    
    displayJobs(filteredJobs);
}