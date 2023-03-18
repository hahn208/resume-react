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
        'position' : 'Software Engineering Manager',
        'stint' : 'May 2021 – Present • Remote',
        'details' : 'Engineering manager and tech-lead for multiple teams. Heavy lifted the re-platform from Salesforce to Microsoft D365 with individual contribution of React/SASS, diagramming multi-team dependencies, installing safety checks, and moving the nuclear football from the legacy system to the new platform. Carrying teams over obstacles both technical, abstract, and personal. Sussed-out lurking issues quietly impacting millions in annual revenue. Marshaling tiger teams to triage and stem obscure and catastrophic challenges by reading the tea-leaves of hand-tailored logging. Forged the SDLC across multiple development teams and continue to pilot weekly launches. Orchestrating cross-team (CRM, ERP, BI, F&O) efforts for mission critical feature launches, perfecting alignment of impacted systems. Accelerating teams with code reviews, shared knowledge sessions, tools for enablement, and awful puns.',
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
        'details' : 'Originally assigned HTML and CSS support, but swiftly advanced to full stack developer. Tooled CMS modules, enabling the marketing and operations teams to manage their own promotions. This corrected the situation where skilled developers were under-utilized for trivial HTML tasks. In the short six-month contract: Immersed myself in the tech-stack, delivered expedient results while clearing the two-month user-story backlog, on-boarded two replacement hires.',
        'forceWidow': false
    },
    {
        'title' : 'CenturyLink',
        'logo' : 'centurylink.png',
        'position' : 'Frontend Developer',
        'stint' : 'Sep 2012 – Aug 2015 • Boise, Idaho',
        'details' : 'Evolved codebase to eliminate dependencies on framework shims, decreasing severe technical debt and infrastructure fragility. Authored user-stories for Scrum team to address general performance and usability issues. Conducted A/B tests to measure boosts in revenue achieved by calibrating user experience elements. Engineered user funnel tracing to expose user dead-ends. Directed and delivered browser performance tuning to cull high bounce rate by enacting image optimization, dismantled render blocking, eliminated code redundancies, and shed dead code weight. At times achieved 10x page speed improvement. Empowered team with chrome extension and site tool to remove user interface snags on internal CMS and code repository program.',
        'forceWidow': false
    },
    {
        'title' : 'ShoutStage (now Vinyl)',
        'logo' : 'shoutstage.png',
        'position' : 'Software Engineer',
        'stint' : 'Mar 2012 – Aug 2012 • Boise, Idaho',
        'details' : 'Contributed to a consolidated communication platform with chat API integrations. Drove technology decisions. Heavily researched browser limitations. Bleeding edge work in NodeJS 0.12 and MongoDB.',
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
        'details': 'Since 2019, I have given over 8.5 liters of blood.',
        'forceWidow': false
    },
    {
        'title' : 'GitHub',
        'logo': 'github.png',
        'position': 'Open Source Contributor',
        'stint': '',
        'details': 'Logged issues and contributed resolutions through pull requests.',
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
    'pro': ['HTML5', 'ES6', 'NodeJS', 'React', 'TypeScript', 'CSS3', 'SCSS', 'Jest', 'PHP7', 'MySQL', 'REST', 'oAuth', 'Linux', 'WordPress', 'WCAG'],
    'new': ['MongoDB', 'Python'],
    'tools': ['Docker', 'Cloudways', 'Adobe DTM', 'GTM', 'Git', 'Yarn', 'JetBrains', 'Jira', 'Azure', 'Figma', 'Photoshop']
};

const bio: { [key: string]: string | object } = {
    'title': <h1><em>Andrew</em> <em>Hahn</em></h1>,
    'intro': <p>Professional software engineer since 2004 • Traversed hundreds of miles of Idaho back-country • Designed and implemented home geothermal heating system • Cultivated and leavened <i>scores</i> of sourdough loaves • Sired the cutest / dorkiest child of the Hahn lineage.</p>,
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
            <section>{bio.intro}<p>View Source: <a href="https://github.com/hahn208/resume-react" target="_blank" rel={"noreferrer"}>github.com/hahn208/resume-react</a></p></section>
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
