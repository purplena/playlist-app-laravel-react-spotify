<h2>Project Setup</h2>

<p>Follow the steps below to set up the project locally.</p>

<h3>1. Create the Environment File</h3>

<p>Copy the example environment configuration:</p>

<pre><code>cp .env.example .env</code></pre>

<h3>2. Configure Spotify Environment Variables (optional)</h3>

<p>If you plan to use Spotify authentication, provide:</p>    

<ul>
      <li><code>SPOTIFY_CLIENT_ID</code></li>
      <li><code>SPOTIFY_CLIENT_SECRET</code></li>
</ul>
<p> Generate credentials via the
    <a href="https://developer.spotify.com/dashboard" target="_blank">
      Spotify Developer Dashboard
    </a>.
</p>

<h3>3. Build Docker Containers</h3>
<p>Building the containers can take several minutes</p>
<pre><code>./vendor/bin/sail build --no-cache</code></pre>

<h3>4. Install Dependencies</h3>

<p>Install PHP and Node.js dependencies:</p>

<pre><code>./vendor/bin/sail composer install
./vendor/bin/sail npm install</code></pre>

<h3>5. Generate Application Key</h3>

<pre><code>./vendor/bin/sail artisan key:generate</code></pre>

<h3>6. Set Storage Permissions</h3>

<p>To start a Bash session within your application's container</p>

<pre><code>./vendor/bin/sail root-shell</code></pre>

<p>Ensure Laravel has write access to the storage directory:</p>

<pre><code>cd ..
chown -R sail:sail html</code></pre>

<h3>7. Create Storage Symlink</h3>

<p>Create the symbolic link between
<code>storage/app/public</code> and <code>public/storage</code>:</p>

<pre><code>./vendor/bin/sail artisan storage:link</code></pre>

<h3>8. Run Database Migrations</h3>

<pre><code>./vendor/bin/sail artisan migrate</code></pre>

<h3>9. Build Frontend Assets</h3>

<pre><code>./vendor/bin/sail npm run build</code></pre>

<h3>10. Sail Up the Application</h3>

<pre><code>./vendor/bin/sail up -d</code></pre>

<p><strong>The application should now be running and ready for testing 🎉</strong></p>

<h2>About</h2>

<p>
This project was a challenging and rewarding journey. It provides a comprehensive solution for establishment owners to create and manage personalized playlists that reflect the tastes and atmosphere of their customers, leveraging the Spotify Web API.
</p>

<h3>Project Stack and Configuration</h3>

<p>
The backend is built with <strong>Laravel</strong>, while the frontend is developed using <strong>React.js</strong> and <strong>Material UI</strong>.
</p>

<p>
For local development, the application runs on a Docker-based stack using a classic <strong>LAMP environment</strong>. The setup is managed via <code>docker-compose</code> and is inspired by an initial template similar to <a href="https://github.com/sprintcube/docker-compose-lamp" target="_blank">this one</a> available on GitHub.
</p>

<p>
To interact with the Spotify Web API, the project uses the <a href="https://github.com/jwilsson/spotify-web-api-php" target="_blank"> Spotify Web API PHP SDK </a>, which simplifies HTTP request handling and avoids manual API integration within the Laravel environment.
</p>

<h3>What Did I Learn?</h3>

<p>
This project helped me explore several fundamental web development concepts and significantly strengthened my technical skill set:
</p>

<ul>
  <li>
    A deep understanding of <strong>stateless</strong> and <strong>stateful authentication</strong> using Spotify OAuth 2.0. The application uses the <strong>Client Credentials Flow</strong> (stateless authentication) to search the Spotify catalog, and the <strong>Authorization Code Flow</strong> (stateful authentication) to authenticate company managers, create playlists, and synchronize local playlists with their corresponding Spotify playlists.
  </li>

  <li>
    In-depth exploration of <strong>key Laravel features and design patterns</strong>, including API Resources, Form Request Validation, Middleware, Policies, Application Localization, Laravel Collections, Route Model Binding, and Dependency Injection.
  </li>

  <li>
    On the frontend, I implemented efficient state management using <strong>Zustand</strong>, applied the <strong>optimistic updates</strong> pattern to provide immediate user feedback, and used a <strong>debounce hook</strong> for song search to improve performance         and user experience. I also created a <strong>custom Material UI theme</strong> with support for dynamically changing the primary color of the application, allowing the overall look and feel to be updated in just a few clicks.
  </li>

  <li>
    Implementation of a custom <strong>Laravel Artisan command</strong> to synchronize playlists using Spotify <strong>snapshot IDs</strong>, along with a <strong>cron job</strong> configured to run the synchronization process every midnight. Snapshot IDs act as a version-control mechanism within the Spotify API, and playlist synchronization requires comparing local and remote snapshot IDs to determine the appropriate update workflow.
  </li>
</ul>
