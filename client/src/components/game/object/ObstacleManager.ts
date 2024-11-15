// src/components/game/ObstacleManager.ts
import {Scene} from 'phaser'

export class ObstacleManager {
  private readonly obstacles: Phaser.GameObjects.Group

  constructor(private scene: Scene) {
    this.obstacles = this.scene.add.group()
  }

  createObstacles() {
    const objectData = [
      {x: 400, y: 300, type: 'tree'},
      {x: 600, y: 500, type: 'rock'},
      {x: 800, y: 200, type: 'house'},
      {x: 1000, y: 600, type: 'bush'},
      {x: 1200, y: 400, type: 'fence'},
    ]

    objectData.forEach((data) => {
      let obstacle: Phaser.GameObjects.Sprite | undefined

      // Add sprite based on the `type` from `objectData`
      switch (data.type) {
        case 'tree':
          obstacle = this.scene.add.sprite(data.x, data.y, 'tree-sprite').setScale(1.5)
          break
        case 'rock':
          obstacle = this.scene.add.sprite(data.x, data.y, 'rock-sprite')
          break
        case 'house':
          obstacle = this.scene.add.sprite(data.x, data.y, 'house-sprite')
          break
        case 'bush':
          obstacle = this.scene.add.sprite(data.x, data.y, 'bush-sprite')
          break
        case 'fence':
          obstacle = this.scene.add.sprite(data.x, data.y, 'fence-sprite')
          break
      }

      if (obstacle) {
        this.scene.physics.add.existing(obstacle)
        const physicsObstacle = this.scene.physics.add.existing(obstacle) as unknown as Phaser.Physics.Arcade.StaticBody
        physicsObstacle.immovable = true
        this.obstacles.add(obstacle)
      }
    })
  }

  getObstacles(): Phaser.GameObjects.Group {
    return this.obstacles
  }
}
