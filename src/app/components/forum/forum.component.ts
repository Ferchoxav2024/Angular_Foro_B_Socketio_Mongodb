import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  posts: any[] = [];
  news: any;
  title: string = '';
  body: string = '';

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    this.loadNews();
    this.loadPosts();
    this.listenForPostEvents();
  }

  loadNews(): void {
    // Simular la carga de una noticia
    this.news = {
      title: 'La galaxia rosa',
      author: 'Manuel del Valle',
      urlToImage: 'https://p4.wallpaperbetter.com/wallpaper/548/852/23/pink-stars-4k-nebula-wallpaper-preview.jpg',
      description: 'El autor procura más bien alertar a la ciudadanía y propone resistir a su expansión a través de las elecciones generales.',
      url: 'https://example.com'
    };
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(
      res => {
        this.posts = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  onCreatePost(): void {
    const user = this.authService.getCurrentUser();
    const post = {
      title: this.title,
      body: this.body,
      userId: user._id || user.id // Asegúrate de que el campo de ID sea correcto
    };

    this.postService.createPost(post).subscribe(
      res => {
        this.posts.unshift(res);
        this.title = '';
        this.body = '';
      },
      err => {
        console.error(err);
      }
    );
  }

  onDeletePost(id: string): void {
    this.postService.deletePost(id).subscribe(
      res => {
        this.posts = this.posts.filter(post => post._id !== id);
      },
      err => {
        console.error(err);
      }
    );
  }

  listenForPostEvents(): void {
    this.socketService.onEvent('newPost').subscribe((post: any) => {
      console.log('New post received via Socket.IO:', post);
      this.posts.unshift(post);
    });

    this.socketService.onEvent('deletePost').subscribe((postId: string) => {
      console.log('Post deleted via Socket.IO:', postId);
      this.posts = this.posts.filter(post => post._id !== postId);
    });
  }
}
