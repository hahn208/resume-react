import React from 'react';
import './App.css';

/**
 * TODO: SCSS & Gulp, JSDoc, tests
 */

type ExperienceType = {
    title: string,
    logo: string,
    position: string,
    stint: string,
    details: string,
    forceWidow: boolean
}

/**
 * Array of objects typed by ExperienceType
 */
const experienceSet: ExperienceType[] = [
    {
        'title' : 'Mattress Firm',
        'logo' : 'mattressfirm.png',
        'position' : 'Front End Developer',
        'stint' : 'May 2021 – Present • Remote',
        'details' : 'Sought out by former manager to join staff. Assisting in the replatform to Dynamics 365 by contributing React & LESS. Continually encouraging team with code reviews, shared knowledge sessions, awful puns, and distributed workload. Providing department-wide support outside of assigned duties. Lead the charge to complete the web aspect of a fresh $32M marketing campaign.',
        'forceWidow': false
    },
    {
        'title' : 'Thrive Web Designs (agency)',
        'logo' : 'thrive.png',
        'position' : 'Sr. Full Stack Developer',
        'stint' : 'Sep 2015 – May 2021 • Boise, Idaho',
        'details' : 'Fastened close relationships with clients. Piloted sites given concept / design to fully deployed mobile-first, ADA compliant, and PageInsights "A" rated. Adapted and extended the Wordpress platform to enrich client capabilities. Exacted bugs on brownfield projects. Instituted personal coding standards and disciplines. Tutored junior devs and new hires. Detailed setup and maintenance instructions for team collective knowledge capital. Highlighted work: PBS Kids, Ada County ID, IDVSA.org, Lee Pesky Learning Center, Syringa Properties, Boise State University.',
        'forceWidow': false
    },
    {
        'title' : 'Mattress Firm',
        'logo' : 'mattressfirm.png',
        'position' : 'Software Engineer (contract)',
        'stint' : 'Mar 2020 – Jul 2020 • Remote',
        'details' : 'Originally assigned HTML and CSS support, but swiftly advanced to full stack developer. Tooled CMS modules, which enabled the marketing team to manage their own promotions. This corrected the situation where skilled developers were under-utilized for trivial HTML tasks. In the short six-month contract, immersed myself in the tech-stack, delivered expedient results while clearing the two-month user-story backlog, on-boarded two replacement hires.',
        'forceWidow': true
    },
    {
        'title' : 'CenturyLink',
        'logo' : 'centurylink.png',
        'position' : 'Frontend Developer',
        'stint' : 'Sep 2012 – Aug 2015 • Boise, Idaho',
        'details' : 'Evolved codebase to eliminate dependencies on framework shims, decreasing sever technical debt and infrastructure fragility. Wrote user-stories for my Agile team to address general performance and usability issues. Conducted A/B tests to measure boosts in revenue achieved by calibrating user experience elements. Engineered user funnel tracing to expose user dead-ends. Directed and delivered browser performance tuning to cull high bounce rate by enacting image optimization, dismantled render blocking, eliminated code redundancies, and shed dead code weight. At times achieved 10x page speed improvement. Empowered team with chrome extension and website tool to remove user interface snags on internal CMS and code repository program.',
        'forceWidow': false
    },
    {
        'title' : 'ShoutStage (now Vinyl)',
        'logo' : 'shoutstage.png',
        'position' : 'Software Engineer',
        'stint' : 'Mar 2012 – Aug 2012 • Boise, Idaho',
        'details' : 'Contributed to a consolidated communication platform with chat API integration. Assisted in driving technology decisions. Coordinated with design team for usability enhancements.Researched browser limitations. NodeJS 0.12.',
        'forceWidow': false
    },
    {
        'title' : 'UpTop Corp (agency)',
        'logo' : 'uptop.png',
        'position' : 'Software Engineer',
        'stint' : 'Jul 2006 – Feb 2012 • Boise, Idaho',
        'details' : 'Owned high traffic projects with CenturyLink. Balanced rapid pace concurrent promos broadcast to hundreds of thousands of customers. Various local and international projects.',
        'forceWidow': false
    }
];

const volunteer: ExperienceType[] = [
    {
        'title' : 'American Red Cross',
        'logo': 'redcross.png',
        'position': 'Blood Donor',
        'stint': '',
        'details': 'I donate blood as often as eligible. As of June 2021 I have given over 4 liters of blood.',
        'forceWidow': false
    },
    {
        'title' : 'GitHub',
        'logo': 'github.png',
        'position': 'Open Source Contributor',
        'stint': '',
        'details': 'Reported issues and contributed code through pull requests.',
        'forceWidow': false
    }
];

const education: ExperienceType = {
    'title' : 'College of Idaho',
    'logo': 'cofi.png',
    'position': 'Bachelors • Mathematics and Computer Science',
    'stint': '2002 – 2006 • Caldwell, Idaho',
    'details': 'Proposed and negotiated creation of new student engineer positions in IT department. Served campus community by daylighting student organizations with websites, spearheaded school’s first online voting system, and established two new computer labs.',
    'forceWidow': false
};

const skillSet: { [key: string]: string[] } = {
    'pro': ['HTML5', 'CSS3', 'SCSS', 'JS', 'ES6', 'React', 'TypeScript', 'PHP7.4', 'OOP', 'MySQL', 'REST & SOAP', 'oAuth', 'Linux', 'Apache', 'WordPress', 'WCAG', 'Photography'],
    'new': ['NodeJS', 'MongoDB', 'Python'],
    'tools': ['Docker', 'Cloudways', 'Adobe DTM', 'GTM', 'Git', 'Gulp', 'JetBrains', 'Confluence', 'Azure', 'Zeplin', 'Figma', 'Photoshop']
};

const bio: { [key: string]: string | object } = {
    'title': <h1><em>Andrew</em> <em>Hahn</em></h1>,
    'intro': <p>Professional web developer since 2004 • Traversed hundreds of miles of Idaho back-country • Designed and implemented home geothermal heating system • Cultivated and leavened <i>scores</i> of sourdough loaves • Sired the cutest / dorkiest child of the Hahn lineage.</p>,
    'logo': '',
    'address': <p>Boise, Idaho<br/>208ha<span className={'no-spam'}>asdf</span>hn&#64;gmail&#46;com<br/>208-283-52<span className={'no-spam'}>4321</span>98</p>,
    'slogan': <p>Endeavor with our <strong>heads together</strong>.</p>
};

/**
 *
 * @param {object} props
 * @constructor
 */
function ResumeItem(props: { experience: ExperienceType; })
{
    const experienceImage = require(`./images/${props.experience.logo}`).default;

    return(
        <section className={ props.experience.forceWidow ? 'print-widow' : ''}>
            <div className="company-logo">
                <img src={experienceImage} alt={props.experience.title} />
            </div>
            <div className="background-section">
                <h3>{props.experience.position}</h3>
                <p>{props.experience.title}</p>
                <h4>{props.experience.stint}</h4>
            </div>
            <div className="work-details">
                <p>{props.experience.details}</p>
            </div>
        </section>
    );
}

/**
 * ResumeMain
 * Display bio, iterate over the array of experience objects, output education.
 *
 * @return JSX
 */
function ResumeMain()
{
    return(
        <div className={'grid-area-experience'}>
            { bio.title }
            <section>{bio.intro}<p>View Source: <a href="https://github.com/hahn208/resume-react" target="_blank">github.com/hahn208/resume-react</a></p></section>
            <h2><em>Education</em></h2>
            <ResumeItem experience={education}/>
            <h2><em>Experience</em></h2>
            { experienceSet.map(experienceItem => (<ResumeItem experience={experienceItem}/>)) }
        </div>
    );
}

/**
 * Sidebar
 * Build skillset html. Display profile, skills, volunteer experience, and little bio.
 *
 * @return JSX
 */
function Sidebar()
{
    /**
     * Build an array of list items containing skills
     *
     * @param set
     */
    let skillsOutput = (set: Array<string>) => (
        set.map(
            (item: string, index: number) => {
                return <li>{item}</li>;
            }
        )
    );

    return (
        <div className={'grid-area-sidebar'}>
            <img src={require('./images/profile.jpg').default} alt="Andrew Hahn with son" style={{'width': '100%'}}/>
            <section>
                <img src={require('./images/ah.png').default} alt={'AH'} id={'AH'}/>
                {bio.address}
                {bio.slogan}
            </section>
            <h5>Professional Skills</h5>
            <ul className='skills-list'>
                {skillsOutput(skillSet.pro)}
            </ul>
            <h5>Novice Skills</h5>
            <ul className='skills-list'>
                {skillsOutput(skillSet.new)}
            </ul>
            <h5>Professional Tools</h5>
            <ul className='skills-list'>
                {skillsOutput(skillSet.tools)}
            </ul>
            <h2><em>Volunteer</em> <em>Experience</em></h2>
            { volunteer.map(experienceItem => (<ResumeItem experience={experienceItem}/>)) }
        </div>
    );
}

function App()
{
  return (
    <div className="App">
      <Sidebar/>
      <ResumeMain/>
    </div>
  );
}

export default App;
