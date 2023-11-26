import {memo, MutableRefObject, ReactNode, useEffect, useRef, useState} from 'react';
import './App.scss';

interface ExperienceType {
    title?: string,
    logo?: string,
    position?: string,
    stint: string,
    details: string,
    forceWidow: boolean,
}

/**
 * Import the work experience json.
 */
const experienceSet: ExperienceType[] = require('./data/experience.json');

/**
 * Import the volunteer experience json.
 */
const volunteer: ExperienceType[] = require('./data/volunteer.json');

/**
 * Import the education experience json.
 */
const education: ExperienceType[] = require('./data/education.json');

const skillSet: { [key: string]: string[] } = {
    'pro': ['HTML5', 'ES7', 'NodeJS', 'React', 'TypeScript', 'CSS3', 'SCSS', 'Jest', 'PHP8', 'MySQL', 'REST', 'Linux', 'WordPress', 'WCAG'],
    'new': ['NextJS', 'Tailwind', 'MongoDB', 'Python', 'OpenAI'],
    'tools': ['Docker', 'Azure', 'GTM', 'Git', 'Yarn', 'npm', 'JetBrains', 'Jira', 'Figma', 'Photoshop']
};

const bio: { [key: string]: ReactNode } = {
    'title': <h1><em>Andrew</em> <em>Hahn</em> <small>(He/Him)</small></h1>,
    'intro': <p>15+ years in software engineering • Traversed hundreds of miles of Idaho back-country • Designed and implemented home geothermal heating system • Cultivated and leavened <i>scores</i> of sourdough loaves • Sired the cutest/dorkiest child of the Hahn lineage.</p>,
    'address': <span>208ha<span className={'no-spam'}>asdf</span>hn&#64;gmail&#46;com<br/>208-283-52<span className={'no-spam'}>4321</span>98<br/>Boise, Idaho USA</span>,
    'slogan': <p>Heads together <strong>we endeavor.</strong></p>
};

/**
 * Given a string, remove any non-alphanum characters and replace with a hyphen.
 * @param rawString The unsanitized string.
 * @return string
 */
const makeSafeKeyString = (rawString: string) => rawString.replace(/[^a-z0-9]/gi, '-').toLowerCase();

/**
 * Return the current time, to the minute only, in Boise.
 * @return string
 */
const getIdahoTime = () => new Intl.DateTimeFormat('en-GB', { month: 'short', day: 'numeric', year:'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'America/Boise' }).format(new Date()); 

/**
 *
 * @param {object} props
 * @constructor
 */
function ResumeItem({experience}: { experience: ExperienceType })
{
    
    let experienceImage;
    if(experience.logo)
    {
        experienceImage = require(`./images/${experience.logo}`);
        experienceImage = <div className='company-logo'><img src={experienceImage} className={'company-logo_img'} alt={experience.title && experience.title}/></div>;
    }

    return(
        <section className={ experience.forceWidow ? 'print-widow' : undefined }>
            { experience.logo && experienceImage }
            <div className='background-section'>
                { experience.position && <h3>{experience.position}</h3> }
                { experience.title && <p>{experience.title}</p> }
                <h4>{experience.stint}</h4>
            </div>
            <div className='work-details'>
                <p>{experience.details}</p>
            </div>
        </section>
    );
}

/**
 * ResumeExperience
 * Iterate over the arrays of experience objects.
 *
 * @return JSX
 */
function ResumeExperience()
{
    return(
        <div className={'grid-area-experience'}>
            <>
                <h2><em>Experience</em></h2>
                { experienceSet.map(experienceItem => (<ResumeItem experience={experienceItem}/>)) }
            </>
        </div>
    );
}

/**
 * 
 * @return JSX
 */
function ResumeBio()
{
    return(
        <div className={'grid-area-bio'}>
            <>
                { bio.title }
                <section>
                    <>{/* require().default needed because webpack doesn't load svg file types inherently */}
                        {bio.intro}<p><a href='https://github.com/hahn208/' target='_blank' rel={'noreferrer'}><img src={require('./images/github-ico-dark.svg').default} height={31} width={31} alt={'Github account- Andrew Hahn'} /></a>&nbsp;<a href='https://www.linkedin.com/in/208hahn/' target='_blank' rel={'noreferrer'}><img src={require('./images/linkedin-ico.svg').default} height={32} width={32} alt={'LinkedIn account- Andrew Hahn'} /></a></p>
                    </>
                </section>
            </>
        </div>
    )
}

// TODO: Convert to context? https://react.dev/reference/react/memo#updating-a-memoized-component-using-a-context
const IdahoTime = memo(
    function IdahoTime()
    {
        // Create a ref for the interval timer, so it can be cleared later.
        let idahoTimePendulum: MutableRefObject<NodeJS.Timer | false> = useRef(false);
        
        /* Create a state variable and setter for the time display */
        const [idahoTime, setIdahoTime] = useState(getIdahoTime());
        
        // Avoid rendering the time before hydration. Only run once.
        useEffect(
            () => {
                // In Dev mode this might render twice. Prevent multiple intervals from being created.
                if(!idahoTimePendulum.current)
                    idahoTimePendulum.current = setInterval(() => { setIdahoTime(getIdahoTime()) }, 5000);
                
                // Return a callback function when the component is unmounted so the interval is cleared.
                return () => { clearInterval(~~idahoTimePendulum.current); idahoTimePendulum.current = false; };
            },
            [idahoTime]
        );
        
        return <span className={'d-print-none'}>{ idahoTime }</span>;
    }
)

/**
 * Sidebar
 * Build skillset html. Display profile, skills, volunteer experience, and little bio.
 *
 * @return JSX
 */
function Sidebar()
{
    /**
     * Build an array of html list items containing skills.
     *
     * @param skillSet
     */
    let skillsOutput = (skillSet: Array<string>) => (
        skillSet.map(
            (skill: string) => <li key={makeSafeKeyString(skill)}>{skill}</li>
        )
    );

    return (
        <div className={'grid-area-sidebar'}>
            <img src={require('./images/profile.jpg')} alt='Andrew Hahn with son' className={'d-print-none'} style={{'width': '100%'}}/>
            <section className={'print-t-0'}>
                <div className={'flex gap-4'}>
                    <img src={require('./images/ah.png')} alt={'AH'} id={'AH'}/>
                    <div>
                        <p>
                            {bio.address}<br/>
                            <IdahoTime/>
                            <span className={'d-print'}>Mountain Time Zone</span>
                        </p>
                    </div>
                </div>
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
            <h2><em>Education</em></h2>
            { education.map(experienceItem => (<ResumeItem experience={experienceItem}/>)) }
            <h2><em>Volunteer</em> <em>Experience</em></h2>
            { volunteer.map(experienceItem => (<ResumeItem experience={experienceItem}/>)) }
        </div>
    );
}

/**
 * The main app to display sidebar and content.
 * 
 * @constructor
 */
function App() 
{
    return (
        <div className='App'>
            <Sidebar/>
            <ResumeBio/>
            <ResumeExperience/>
        </div>
    );
}

export default App;